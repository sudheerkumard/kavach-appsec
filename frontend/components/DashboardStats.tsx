"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {

  const [stats, setStats] = useState({
    repositories: 0,
    scans: 0,
    findings: 0,
    critical: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    const findingsResponse = await fetch(
      "http://127.0.0.1:8000/api/findings/"
    );

    const findingsData = await findingsResponse.json();

    const criticalCount = findingsData.items.filter(
      (f: any) => f.severity === "CRITICAL"
    ).length;

    setStats({
      repositories: 2,
      scans: 24,
      findings: findingsData.total || 0,
      critical: criticalCount,
    });
  };

  const cards = [
    {
      title: "Repositories",
      value: stats.repositories,
    },
    {
      title: "Scans",
      value: stats.scans,
    },
    {
      title: "Findings",
      value: stats.findings,
    },
    {
      title: "Critical",
      value: stats.critical,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-[#041633] border border-cyan-900 rounded-2xl p-8 shadow-xl"
        >

          <p className="text-gray-400 text-lg">
            {card.title}
          </p>

          <h2 className="text-6xl font-bold mt-4">
            {card.value}
          </h2>

        </div>
      ))}

    </div>
  );
}