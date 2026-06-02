"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import DashboardCards from "@/components/DashboardCards";
import ScanLauncher from "@/components/ScanLauncher";
import SeverityChart from "@/components/SeverityChart";
import ToolHeatmap from "@/components/ToolHeatmap";
import FindingsTable from "@/components/FindingsTable";
import RepositoryExplorer from "@/components/RepositoryExplorer";
import ScanHistoryPanel from "@/components/ScanHistoryPanel";
import RepositoryRisk from "@/components/RepositoryRisk";
import RepositoryDetailsDrawer from "@/components/RepositoryDetailsDrawer";
import EnterpriseReportButton
from "@/components/EnterpriseReportButton";

export default function Home() {

  const [dashboard, setDashboard] = useState<any>(null);

  const [selectedSeverity, setSelectedSeverity] =
    useState("ALL");

  const [selectedTool, setSelectedTool] =
    useState("ALL");

  const [selectedPanel, setSelectedPanel] =
    useState("");

  const [selectedRepo, setSelectedRepo] =
    useState<any>(null);

  /* useEffect(() => {

    fetch("http://localhost:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => {

        console.log("DASHBOARD:", data);

        setDashboard(data);

      })
      .catch((err) => {

        console.error(err);

      });

  }, []); */

useEffect(() => {

  setDashboard({
    total_repositories: 18,
    total_findings: 245,
    critical: 12,
    high: 34,
    medium: 78,
    low: 121,

    repository_risk: [
      {
        id: 1,
        name: "payment-service",
        score: 92
      },
      {
        id: 2,
        name: "customer-portal",
        score: 81
      },
      {
        id: 3,
        name: "mobile-backend",
        score: 67
      }
    ]
  });

}, []);

  if (!dashboard) {

    return (

      <div
        className="
        min-h-screen
        bg-[#020817]
        flex
        items-center
        justify-center
        text-white
      "
      >
        Loading Dashboard...
      </div>

    );

  }

  const handleCardClick = (card: string) => {

    if (card === "critical") {

      setSelectedSeverity("CRITICAL");

    }

    if (card === "repositories") {

      setSelectedPanel("repositories");

    }

    if (card === "scans") {

      setSelectedPanel("scans");

    }

  };

  return (

    <main
      className="
      min-h-screen
      bg-[#020817]
      text-white
      px-8
      py-8
    "
    >

      <Header />

	<div className="mt-6 mb-6">
 	 <EnterpriseReportButton />
	</div>

      <DashboardCards
        dashboard={dashboard}
        onCardClick={handleCardClick}
      />

      <div className="mt-8">

        <ScanLauncher />

      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mt-8
      "
      >

        <SeverityChart dashboard={dashboard} />

        <ToolHeatmap
          dashboard={dashboard}
          onToolClick={(tool) => {

            setSelectedTool(tool);

          }}
        />

      </div>

      <div className="mt-8">

        <RepositoryRisk
          repositories={dashboard.repository_risk || []}
          onRepoClick={setSelectedRepo}
        />

      </div>

      {selectedPanel === "repositories" && (

        <div className="mt-8">

          <RepositoryExplorer />

        </div>

      )}

      {selectedPanel === "scans" && (

        <div className="mt-8">

          <ScanHistoryPanel />

        </div>

      )}

      <div className="mt-8">

        <FindingsTable
          severityFilter={selectedSeverity}
          toolFilter={selectedTool}
        />

      </div>

      {selectedRepo && (

        <RepositoryDetailsDrawer
          repository={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />

      )}

    </main>

  );

}