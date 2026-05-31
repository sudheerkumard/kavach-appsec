"use client";

import { useEffect, useState } from "react";

export default function ScanHistoryPanel() {

  const [scans, setScans] = useState<any[]>([]);

  useEffect(() => {

    fetch("http://localhost:8000/api/scans/")
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setScans(data);
        } else if (data.items) {
          setScans(data.items);
        }

      })
      .catch(console.error);

  }, []);

  return (

    <div
      className="
        bg-[#071326]
        border
        border-cyan-900
        rounded-2xl
        p-8
      "
    >

      <h2 className="text-3xl font-bold text-white mb-6">
        Scan History
      </h2>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="text-cyan-400 border-b border-cyan-900">

              <th className="p-4 text-left">
                Scan ID
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Progress
              </th>

            </tr>

          </thead>

          <tbody>

            {scans.map((scan) => (

              <tr
                key={scan.id}
                className="
                  border-b
                  border-cyan-950
                "
              >

                <td className="p-4 text-white">
                  {scan.id}
                </td>

                <td className="p-4 text-cyan-300">
                  {scan.status}
                </td>

                <td className="p-4 text-slate-300">
                  {scan.scan_type}
                </td>

                <td className="p-4 text-slate-300">
                  {scan.progress}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}