"use client";

import { useState } from "react";
import RepositoryDetailsDrawer from "./RepositoryDetailsDrawer";

interface Props {
  repositories: any[];
  onRepoClick?: (repo: any) => void;
}

export default function RepositoryRisk({
  repositories,
  onRepoClick,
}: Props) {

  const [selectedRepo, setSelectedRepo] =
    useState<any>(null);

  const riskColor = (risk: string) => {

    switch (risk) {

      case "CRITICAL":
        return "bg-red-600";

      case "HIGH":
        return "bg-orange-500";

      case "MEDIUM":
        return "bg-yellow-500";

      default:
        return "bg-green-600";
    }
  };

  const scoreColor = (score: number) => {

    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";

    return "text-red-500";
  };

  if (!repositories?.length) {
    return null;
  }

  return (

    <>

      <div
        className="
          bg-gradient-to-br from-[#081224] to-[#10244d]
          border
          border-cyan-800
          rounded-2xl
          p-8
        "
      >

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-white">
            Repository Risk Ranking
          </h2>

          <p className="text-gray-400 mt-2">
            Risk scoring based on findings severity distribution
          </p>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {repositories.map((repo: any) => (

            <div
              key={repo.id}
              onClick={() => {

                setSelectedRepo(repo);

                if (onRepoClick) {
                  onRepoClick(repo);
                }

              }}
              className="
                bg-[#0b1d36]
                border
                border-cyan-900
                rounded-xl
                p-6
                cursor-pointer
                hover:border-cyan-500
                hover:shadow-lg
                transition
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    {repo.name}
                  </h3>

                  <div
                    className="
                      text-cyan-300
                      text-sm
                      break-all
                    "
                  >
                    {repo.repo_url}
                  </div>

                </div>

                <span
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-white
                    font-semibold
                    ${riskColor(repo.risk)}
                  `}
                >
                  {repo.risk}
                </span>

              </div>

              <div className="mt-6">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Risk Score
                  </span>

                  <span
                    className={`
                      text-4xl
                      font-bold
                      ${scoreColor(repo.score)}
                    `}
                  >
                    {repo.score}
                  </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-3">

                  <div
                    className="
                      bg-gradient-to-r from-red-500 to-blue-500
                      h-3
                      rounded-full
                    "
                    style={{
                      width: `${repo.score}%`,
                    }}
                  />

                </div>

              </div>

              <div
                className="
                  grid
                  grid-cols-4
                  gap-3
                  mt-6
                "
              >

                <div className="bg-[#071326] rounded-lg p-3 text-center">

                  <div className="text-red-500 text-xl font-bold">
                    {repo.critical}
                  </div>

                  <div className="text-xs text-gray-400">
                    Critical
                  </div>

                </div>

                <div className="bg-[#071326] rounded-lg p-3 text-center">

                  <div className="text-orange-400 text-xl font-bold">
                    {repo.high}
                  </div>

                  <div className="text-xs text-gray-400">
                    High
                  </div>

                </div>

                <div className="bg-[#071326] rounded-lg p-3 text-center">

                  <div className="text-yellow-400 text-xl font-bold">
                    {repo.medium}
                  </div>

                  <div className="text-xs text-gray-400">
                    Medium
                  </div>

                </div>

                <div className="bg-[#071326] rounded-lg p-3 text-center">

                  <div className="text-green-400 text-xl font-bold">
                    {repo.low}
                  </div>

                  <div className="text-xs text-gray-400">
                    Low
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <RepositoryDetailsDrawer
        repository={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />

    </>

  );

}