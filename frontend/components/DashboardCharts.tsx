"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  severity_distribution: any;
  tool_distribution: any;
}

export default function DashboardCharts({
  severity_distribution,
  tool_distribution
}: Props) {

  const severityData = Object.entries(severity_distribution || {}).map(
    ([name, value]) => ({
      name,
      value
    })
  );

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e"
  ];

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="bg-[#071326] border border-cyan-950 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Severity Distribution
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={severityData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {severityData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-[#071326] border border-cyan-950 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Tool Risk Heatmap
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {Object.entries(tool_distribution || {}).map(([tool, value]) => (

            <div
              key={tool}
              className="bg-green-700 rounded-xl p-6 text-center"
            >

              <div className="text-2xl font-bold text-white">
                {tool}
              </div>

              <div className="text-5xl font-bold text-white mt-4">
                {String(value)}
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}