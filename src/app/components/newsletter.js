"use client";

import React from "react";

export default function Newsletter() {
  return (
    <div className="newsletter">
      <h2>Subscreve a nossa newsletter</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
