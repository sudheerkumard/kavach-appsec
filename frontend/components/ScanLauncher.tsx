"use client";

import { useState } from "react";

export default function ScanLauncher() {

  const [repoUrl, setRepoUrl] = useState("");

  const startScan = async () => {

    if (!repoUrl) {
      alert("Please enter a repository URL");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8000/api/scans/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repo_url: repoUrl,
	    scan_type: "full"
          }),
        }
      );

      const result = await response.json();

      alert(
        result.message || "Scan started successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to Aegis backend"
      );

    }

  };

  return (

    <div
      className="
        bg-gradient-to-r
        from-[#081224]
        to-[#0f1d3b]
        border
        border-blue-800
        rounded-2xl
        p-8
        shadow-xl
      "
    >

      <h2 className="text-4xl font-bold text-white mb-2">
        Launch Security Scan
      </h2>

      <p className="text-slate-400 mb-8">
        Start DevSecOps security assessment for repositories,
        containers and infrastructure code.
      </p>

      <div className="flex gap-4">

        <input
          value={repoUrl}
          onChange={(e) =>
            setRepoUrl(e.target.value)
          }
          placeholder="https://github.com/org/repository.git"
          className="
            flex-1
            bg-[#020817]
            border
            border-blue-800
            rounded-xl
            px-5
            py-4
            text-white
            focus:outline-none
            focus:border-red-500
          "
        />

        <button
          onClick={startScan}
          className="
            px-8
            bg-red-600
            hover:bg-red-700
            rounded-xl
            font-bold
            text-white
            transition
          "
        >
          Start Scan
        </button>

      </div>

    </div>

  );

}