import { promises as fs } from "fs";
import path from "path";
import { headers } from "next/headers";
import { getRateLimitInfo, incrementRateLimit } from "../middleware/rateLimit";

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request) {
  try {
    // Get headers
    const headersList = await headers();

    // CSRF Protection - Check Origin against Host
    const origin = headersList.get("origin");
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    if (!origin || `${protocol}://${host}` !== origin) {
      return new Response(JSON.stringify({ error: "Invalid origin" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Rate Limiting
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const rateLimitInfo = await getRateLimitInfo();

    if (rateLimitInfo.isRateLimited) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": rateLimitInfo.remainingTokens.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Email validation
    if (!EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Increment rate limit counter
    incrementRateLimit(rateLimitInfo.tokenKey);

    // Get the path to the data directory
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "newsletter-emails.txt");

    // Create the data directory if it doesn't exist
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir);
    }

    // Check if email already exists
    try {
      const existingEmails = await fs.readFile(filePath, "utf8");
      if (existingEmails.includes(email)) {
        return new Response(
          JSON.stringify({
            error: "Email already subscribed",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error) {
      // File doesn't exist yet, continue
    }

    // Append the email to the file
    const timestamp = new Date().toISOString();
    await fs.appendFile(filePath, `${timestamp}: ${email}\n`);

    return new Response(
      JSON.stringify({
        success: true,
        remainingAttempts: rateLimitInfo.remainingTokens - 1,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": (
            rateLimitInfo.remainingTokens - 1
          ).toString(),
        },
      }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
