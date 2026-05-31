"use client";

import { useState } from "react";

export default function ScanForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("");

  const startScan = async () => {
    setStatus("Starting scan...");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/scans/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo_url: repoUrl,
        }),
      });

      const data = await res.json();

      setStatus(`Queued: ${data.task_id}`);
    } catch {
      setStatus("Scan failed");
    }
  };

  return (
    <div className="card">
      <h2>Launch Security Scan</h2>

      <input
        className="input"
        placeholder="https://github.com/org/repo.git"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button className="button" onClick={startScan}>
        Start Scan
      </button>

      <p style={{ marginTop: "15px" }}>{status}</p>
    </div>
  );
}