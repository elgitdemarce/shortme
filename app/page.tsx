"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);

    const res = await fetch("/api/encode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setShortUrl(data.shortUrl);
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1e293b, #0f172a 60%, #020617)",
        color: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Dex URL Shortener
        </h1>

        <p
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 25,
          }}
        >
          Convierte URLs largas en enlaces cortos y limpios.
        </p>

        <input
          type="text"
          placeholder="https://example.com/link/muy/largo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            marginBottom: 15,
            outline: "none",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 8,
            border: "none",
            background: loading
              ? "#334155"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "Generando..." : "Generar enlace corto"}
        </button>

        {shortUrl && (
          <div
            style={{
              marginTop: 25,
              padding: 15,
              borderRadius: 8,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>
              Tu enlace corto:
            </p>
            <a
              href={shortUrl}
              target="_blank"
              style={{
                color: "#a5b4fc",
                textDecoration: "none",
                wordBreak: "break-all",
                fontWeight: 500,
              }}
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
