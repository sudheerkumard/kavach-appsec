"use client";

interface Props {
  findings: any[];
}

export default function RiskHeatmap({ findings }: Props) {

  const tools = ["Semgrep", "Trivy", "Checkov", "Gitleaks"];

  return (

    <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Tool Risk Heatmap
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {tools.map((tool) => {

          const count = findings.filter(
            (f) => f.tool === tool
          ).length;

          const color =
            count > 150
              ? "bg-red-700"
              : count > 70
              ? "bg-yellow-600"
              : "bg-green-700";

          return (

            <div
              key={tool}
              className={`${color} rounded-2xl p-8 text-center shadow-xl`}
            >

              <div className="text-xl font-bold">
                {tool}
              </div>

              <div className="text-5xl font-bold mt-4">
                {count}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}