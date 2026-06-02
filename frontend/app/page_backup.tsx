"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import DashboardCards from "@/components/DashboardCards";
import ScanLauncher from "@/components/ScanLauncher";
import SeverityChart from "@/components/SeverityChart";
import ToolHeatmap from "@/components/ToolHeatmap";
import FindingsTable from "@/components/FindingsTable";
import RepositoryExplorer from "@/components/RepositoryExplorer";
import ScanHistoryPanel from "@/components/ScanHistoryPanel";
import RepositoryRisk from "@/components/RepositoryRisk";
import RepositoryDetailsDrawer from "@/components/RepositoryDetailsDrawer";
import EnterpriseReportButton from "@/components/EnterpriseReportButton";

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

  useEffect(() => {

    fetch("http://localhost:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => {

        console.log("DASHBOARD:", data);

        setDashboard(data);

      })
      .catch((err) => {

        console.error(err);

      });

  }, []);

  if (!dashboard) {

    return (

      <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        flex
        items-center
        justify-center
        text-white
      "
      >
        Loading Aegis DevSecOps Model...
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
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-slate-900
      text-white
      px-8
      py-8
      "
    >

      {/* Top Header Section */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-10
        bg-gradient-to-r
        from-blue-950
        via-slate-900
        to-red-950
        border
        border-blue-800
        rounded-2xl
        p-6
        shadow-xl
        "
      >

        <div>

          <Header />

          <p className="text-slate-300 text-sm mt-2">
            Enterprise DevSecOps • Application Security •
            SBOM Intelligence • Risk Analytics
          </p>

        </div>

        <EnterpriseReportButton />

      </div>

      {/* KPI Cards */}

      <DashboardCards
        dashboard={dashboard}
        onCardClick={handleCardClick}
      />

      {/* Scan Launcher */}

      <div className="mt-8">

        <ScanLauncher />

      </div>

      {/* Charts */}

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

      {/* Repository Risk */}

      <div className="mt-8">

        <RepositoryRisk
          repositories={dashboard.repository_risk || []}
          onRepoClick={setSelectedRepo}
        />

      </div>

      {/* Repository Explorer */}

      {selectedPanel === "repositories" && (

        <div className="mt-8">

          <RepositoryExplorer />

        </div>

      )}

      {/* Scan History */}

      {selectedPanel === "scans" && (

        <div className="mt-8">

          <ScanHistoryPanel />

        </div>

      )}

      {/* Findings */}

      <div className="mt-8">

        <FindingsTable
          severityFilter={selectedSeverity}
          toolFilter={selectedTool}
        />

      </div>

      {/* Repository Details */}

      {selectedRepo && (

        <RepositoryDetailsDrawer
          repository={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />

      )}

      {/* Footer */}

      <Footer />

    </main>

  );

}