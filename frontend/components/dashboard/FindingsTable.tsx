"use client";

import { useEffect, useState } from "react";
import { getFindings } from "@/lib/api";

type Finding = {
  id: number;
  tool: string;
  title: string;
  severity: string;
  file_path: string;
};

export default function FindingsTable() {
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getFindings();
      setFindings(data);
    }

    load();
  }, []);

  return (
    <div className="card">
      <div className="section-title">Recent Findings</div>

      <table className="table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Issue</th>
            <th>Severity</th>
            <th>File</th>
          </tr>
        </thead>

        <tbody>
          {findings.map((item) => (
            <tr key={item.id}>
              <td>{item.tool}</td>
              <td>{item.title}</td>
              <td
                className={
                  item.severity?.toLowerCase() === "high"
                    ? "high"
                    : item.severity?.toLowerCase() === "medium"
                    ? "medium"
                    : "low"
                }
              >
                {item.severity}
              </td>
              <td>{item.file_path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}