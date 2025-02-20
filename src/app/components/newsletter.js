"use client";

import React, { useState, useEffect } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "success") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        // Include credentials to ensure same-origin policy
        credentials: "same-origin",
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setStatus("error");
      setError("Network error occurred");
    }
  };

  return (
    <div className="newsletter">
      <h2>Subscreve a nossa newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "A subscrever..." : "Subscrever"}
        </button>
      </form>
      {(status === "success" || status === "error") && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>{status === "success" ? "Subcrição efectuada" : "Erro"}</h3>
            {status === "error" && <p className="error">{error}</p>}
            <button onClick={() => setStatus("")}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
