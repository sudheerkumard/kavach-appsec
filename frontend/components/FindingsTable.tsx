"use client";

import { useEffect, useState } from "react";
import CVEDrawer from "./CVEDrawer";
import RemediationDrawer from "./RemediationDrawer";

interface Finding {
  id: number;
  tool: string;
  title: string;
  severity: string;
  file_path: string;
  description?: string;
  sla_days?: number;
  due_date?: string;
  days_remaining?: number;
  overdue?: boolean;
  recommendation?: string;
}

interface Props {
  severityFilter?: string;
  toolFilter?: string;
}

export default function FindingsTable({
  severityFilter = "ALL",
  toolFilter = "ALL",
}: Props) {

  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCVE, setSelectedCVE] =
    useState<string | null>(null);

  const [selectedFinding, setSelectedFinding] =
    useState<Finding | null>(null);

  useEffect(() => {

    fetch("http://localhost:8000/api/findings/")
      .then((res) => res.json())
      .then((data) => {

        setFindings(data.items || []);
        setLoading(false);

      })
      .catch(() => {

        setFindings([]);
        setLoading(false);

      });

  }, []);

  const filteredFindings = findings.filter((finding) => {

    const severityMatch =
      severityFilter === "ALL"
        ? true
        : finding.severity === severityFilter;

    const toolMatch =
      toolFilter === "ALL"
        ? true
        : finding.tool === toolFilter;

    return severityMatch && toolMatch;

  });

  const severityColor = (severity: string) => {

    switch (severity) {

      case "CRITICAL":
        return "text-red-500";

      case "HIGH":
        return "text-orange-400";

      case "MEDIUM":
        return "text-yellow-400";

      case "LOW":
        return "text-green-400";

      default:
        return "text-white";
    }
  };

  return (

    <>
      <div
        className="
          bg-[#071326]
          border
          border-cyan-900
          rounded-2xl
          overflow-hidden
        "
      >

        <div className="p-6 border-b border-cyan-950">

          <h2 className="text-4xl font-bold text-white">
            Findings Explorer
          </h2>

          <p className="text-gray-400 mt-2">
            SLA Tracking Enabled
          </p>

        </div>

        <div className="overflow-auto max-h-[900px]">

          <table className="w-full table-fixed">

            <thead className="sticky top-0 bg-[#0b1d36] z-10">

              <tr className="text-left text-cyan-300">

                <th className="p-4 w-[100px]">
                  Tool
                </th>

                <th className="p-4 w-[420px]">
                  Finding
                </th>

                <th className="p-4 w-[140px]">
                  Severity
                </th>

                <th className="p-4 w-[350px]">
                  File
                </th>

                <th className="p-4 w-[120px] text-center">
                  SLA
                </th>

                <th className="p-4 w-[140px] text-center">
                  Due Date
                </th>

                <th className="p-4 w-[150px] text-center">
                  Status
                </th>

                <th className="p-4 w-[110px] text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={8}
                    className="p-6 text-center text-white"
                  >
                    Loading findings...
                  </td>

                </tr>

              ) : filteredFindings.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="p-6 text-center text-gray-400"
                  >
                    No findings available
                  </td>

                </tr>

              ) : (

                filteredFindings.map((finding) => (

                  <tr
                    key={finding.id}
                    className="
                      border-t
                      border-cyan-950
                      hover:bg-[#0d223d]
                    "
                  >

                    <td className="p-4 text-white font-medium">
                      {finding.tool}
                    </td>

                    <td className="p-4">

                      {finding.title?.startsWith("CVE-") ? (

                        <button
                          onClick={() =>
                            setSelectedCVE(finding.title)
                          }
                          className="
                            text-cyan-400
                            hover:text-cyan-300
                            font-semibold
                          "
                        >
                          {finding.title}
                        </button>

                      ) : (

                        <span className="text-white">
                          {finding.title}
                        </span>

                      )}

                    </td>

                    <td
                      className={`
                        p-4
                        font-bold
                        ${severityColor(finding.severity)}
                      `}
                    >
                      {finding.severity}
                    </td>

                    <td
                      className="
                        p-4
                        text-gray-300
                        truncate
                      "
                    >
                      <span title={finding.file_path}>
                        {finding.file_path}
                      </span>
                    </td>

                    <td className="p-4 text-center text-white">
                      {finding.sla_days} Days
                    </td>

                    <td className="p-4 text-center text-white">
                      {finding.due_date}
                    </td>

                    <td className="p-4 text-center">

                      {finding.overdue ? (

                        <span className="text-red-400 font-semibold">
                          Overdue
                        </span>

                      ) : (

                        <span className="text-green-400 font-semibold">
                          {finding.days_remaining} Days Left
                        </span>

                      )}

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          setSelectedFinding(finding)
                        }
                        className="
                          bg-cyan-600
                          hover:bg-cyan-500
                          w-[70px]
                          py-2
                          rounded-lg
                          text-sm
                          font-semibold
                        "
                      >
                        Fix
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {selectedCVE && (

        <CVEDrawer
          cve={selectedCVE}
          onClose={() => setSelectedCVE(null)}
        />

      )}

      {selectedFinding && (

        <RemediationDrawer
          finding={selectedFinding}
          onClose={() =>
            setSelectedFinding(null)
          }
        />

      )}

    </>
  );
}