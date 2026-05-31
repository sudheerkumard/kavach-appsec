"use client";

import { useState } from "react";
import { launchScan } from "@/lib/api";

export default function ScanLauncher() {
  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");

  async function startScan() {
    if (!repoUrl) {
      setMessage("Please enter repository URL");
      return;
    }

    setMessage("Launching scan...");

    try {
      const result = await launchScan(repoUrl);
      setMessage(`Scan queued: ${result.task_id}`);
      setRepoUrl("");
    } catch {
      setMessage("Scan failed");
    }
  }

  return (
    <div className="card">
      <div className="section-title">Launch Security Scan</div>

      <input
        className="input"
        placeholder="https://github.com/org/repo.git"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button className="button" onClick={startScan}>
        Start Scan
      </button>

      {message && (
        <div style={{ marginTop: 16, color: "#00b7ff" }}>
          {message}
        </div>
      )}
    </div>
  );
}