"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/encode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>URL Shortener (No DB)</h1>

      <input
        type="text"
        placeholder="Pega tu URL larga"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={handleSubmit} style={{ padding: 10 }}>
        Generar
      </button>

      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <strong>Short URL:</strong>
          <br />
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </main>
  );
}
