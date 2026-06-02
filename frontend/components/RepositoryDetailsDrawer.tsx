"use client";

import { useEffect, useState } from "react";

import SBOMExplorer from "./SBOMExplorer";
import DependencyTree from "./DependencyTree";
import LicenseDashboard from "./LicenseDashboard";
import DependencyRiskDashboard from "./DependencyRiskDashboard";
import DependencyAttackPath from "./DependencyAttackPath";
import VulnerabilityPropagationGraph from "./VulnerabilityPropagationGraph";
import SBOMExportPanel from "./SBOMExportPanel";

interface Props {
  repository: any;
  onClose: () => void;
}

export default function RepositoryDetailsDrawer({
  repository,
  onClose,
}: Props) {

  const [tab, setTab] =
    useState("overview");

  const [sbom, setSbom] =
    useState<any>(null);

  useEffect(() => {

    if (!repository) return;

    fetch(
      `http://localhost:8000/api/sbom/${repository.id}`
    )
      .then((res) => res.json())
      .then(setSbom)
      .catch(console.error);

  }, [repository]);

  if (!repository) return null;

  return (

    <div className="fixed inset-0 z-50">

      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-[1100px]
        bg-gradient-to-b from-[#081224] to-[#0f1f3f]
        border-l
        border-blue-800
        p-8
        overflow-y-auto
      "
      >

        <button
          onClick={onClose}
          className="
            float-right
            text-slate-400
            hover:text-white
            text-2xl
          "
        >
          ✕
        </button>

        <h2 className="text-4xl font-bold text-white">
          {repository.name}
        </h2>

        <p className="text-red-300 mt-2 mb-8">
          {repository.repo_url}
        </p>

        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setTab("overview")}
            className={`px-4 py-2 rounded-xl ${
              tab === "overview"
                ? "bg-red-600 text-white"
                : "bg-[#0d1b38]"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setTab("sbom")}
            className={`px-4 py-2 rounded-xl ${
              tab === "sbom"
                ? "bg-red-600 text-white"
                : "bg-[#0d1b38]"
            }`}
          >
            SBOM
          </button>

          <button
            onClick={() => setTab("dependencies")}
            className={`px-4 py-2 rounded-xl ${
              tab === "dependencies"
                ? "bg-red-600 text-white"
                : "bg-[#0d1b38]"
            }`}
          >
            Dependencies
          </button>

          <button
            onClick={() => setTab("licenses")}
            className={`px-4 py-2 rounded-xl ${
              tab === "licenses"
                ? "bg-red-600 text-white"
                : "bg-[#0d1b38]"
            }`}
          >
            Licenses
          </button>

          <button
            onClick={() => setTab("risk")}
            className={`px-4 py-2 rounded-xl ${
              tab === "risk"
                ? "bg-red-600 text-white"
                : "bg-[#0d1b38]"
            }`}
          >
            Risk Analysis
          </button>

	<button
 	 onClick={() => setTab("attackpath")}
 	 className={`px-4 py-2 rounded-xl ${
  	   tab === "attackpath"
     	     ? "bg-red-600 text-white"
             : "bg-[#0d1b38]"
           }`}
         >
           Attack Path
        </button>

	<button
 	onClick={() => setTab("propagation")}
  	className={`px-4 py-2 rounded-xl ${
  	  tab === "propagation"
  	    ? "bg-red-600 text-white"
  	    : "bg-[#0d1b38]"
 	  }`}
	>
	  Propagation
	</button>

        </div>

        {tab === "overview" && (

          <>
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-[#0d1b38] p-5 rounded-xl">

                <div className="text-slate-400">
                  Risk Score
                </div>

                <div className="text-5xl font-bold text-red-300">
                  {repository.score}
                </div>

              </div>

              <div className="bg-[#0d1b38] p-5 rounded-xl">

                <div className="text-slate-400">
                  Risk Rating
                </div>

                <div className="text-4xl font-bold text-red-400">
                  {repository.risk}
                </div>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="text-2xl font-bold mb-4">
                Vulnerability Breakdown
              </h3>

              <ul className="space-y-3">

                <li>Critical: {repository.critical}</li>
                <li>High: {repository.high}</li>
                <li>Medium: {repository.medium}</li>
                <li>Low: {repository.low}</li>

              </ul>

            </div>

          </>

        )}

        {tab === "sbom" && sbom && (

          <>
	    <SBOMExportPanel
 		 repoId={repository.id}
		/>

            <div className="grid grid-cols-3 gap-4 mb-4">

              <div className="bg-[#0d1b38] rounded-xl p-4">
                <div className="text-slate-400 text-sm">
                  Packages
                </div>

                <div className="text-3xl font-bold text-red-300">
                  {sbom.package_count}
                </div>
              </div>

              <div className="bg-[#0d1b38] rounded-xl p-4">
                <div className="text-slate-400 text-sm">
                  Dependencies
                </div>

                <div className="text-3xl font-bold text-red-300">
                  {sbom.dependency_count}
                </div>
              </div>

              <div className="bg-[#0d1b38] rounded-xl p-4">
                <div className="text-slate-400 text-sm">
                  Licenses
                </div>

                <div className="text-3xl font-bold text-red-300">
                  {sbom.unique_licenses}
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="bg-[#0d1b38] rounded-xl p-4">
                <div className="text-slate-400 text-sm">
                  Vulnerable Packages
                </div>

                <div className="text-3xl font-bold text-red-400">
                  {sbom.vulnerable_packages}
                </div>
              </div>

              <div className="bg-[#0d1b38] rounded-xl p-4">
                <div className="text-slate-400 text-sm">
                  Supply Chain Risk
                </div>

                <div className="text-3xl font-bold text-orange-400">
                  {sbom.supply_chain_risk_rating}
                </div>
              </div>

            </div>

            <SBOMExplorer
              components={sbom.components}
            />

          </>

        )}

        {tab === "dependencies" && sbom && (

          <DependencyTree
            dependencies={sbom.dependencies}
          />

        )}

        {tab === "licenses" && sbom && (

          <LicenseDashboard
            components={sbom.components}
          />

        )}

        {tab === "risk" && sbom && (

          <DependencyRiskDashboard
            components={sbom.components}
          />

        )}

	{tab === "attackpath" && sbom && (

 	 <DependencyAttackPath
 	   dependencies={sbom.dependencies}
  	 />

	)}

	{tab === "propagation" && sbom && (

  	<VulnerabilityPropagationGraph
    	  components={sbom.components}
 	  repositoryName={repository.name}
  	/>

	)}

      </div>

    </div>

  );

}