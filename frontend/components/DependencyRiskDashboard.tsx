"use client";

interface Props {
  components: any[];
}

export default function DependencyRiskDashboard({
  components,
}: Props) {

  const critical =
    components.filter(
      (c) => c.risk === "CRITICAL"
    ).length;

  const high =
    components.filter(
      (c) => c.risk === "HIGH"
    ).length;

  const medium =
    components.filter(
      (c) => c.risk === "MEDIUM"
    ).length;

  const low =
    components.filter(
      (c) => c.risk === "LOW"
    ).length;

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Dependency Risk Analysis
      </h2>

      {/* HEATMAP */}

      <div
        className="
        grid
        grid-cols-4
        gap-4
        mb-8
      "
      >

        <div
          className="
          bg-[#020817]
          border
          border-red-900
          rounded-xl
          p-5
        "
        >

          <div className="text-slate-400">
            Critical
          </div>

          <div
            className="
            text-4xl
            font-bold
            text-red-500
          "
          >
            {critical}
          </div>

        </div>

        <div
          className="
          bg-[#020817]
          border
          border-orange-800
          rounded-xl
          p-5
        "
        >

          <div className="text-slate-400">
            High
          </div>

          <div
            className="
            text-4xl
            font-bold
            text-orange-400
          "
          >
            {high}
          </div>

        </div>

        <div
          className="
          bg-[#020817]
          border
          border-yellow-800
          rounded-xl
          p-5
        "
        >

          <div className="text-slate-400">
            Medium
          </div>

          <div
            className="
            text-4xl
            font-bold
            text-yellow-400
          "
          >
            {medium}
          </div>

        </div>

        <div
          className="
          bg-[#020817]
          border
          border-green-800
          rounded-xl
          p-5
        "
        >

          <div className="text-slate-400">
            Low
          </div>

          <div
            className="
            text-4xl
            font-bold
            text-green-400
          "
          >
            {low}
          </div>

        </div>

      </div>

      {/* TOP RISKY PACKAGES */}

      <div
        className="
        bg-[#020817]
        rounded-xl
        p-5
        mb-8
      "
      >

        <h3
          className="
          text-xl
          font-bold
          mb-4
        "
        >
          Top Risky Dependencies
        </h3>

        <div className="space-y-3">

          {components
            .sort(
              (a, b) =>
                b.risk_score - a.risk_score
            )
            .slice(0, 5)
            .map((pkg, idx) => (

              <div
                key={idx}
                className="
                flex
                justify-between
                border-b
                border-cyan-950
                pb-2
                "
              >

                <span>
                  {pkg.name}
                </span>

                <span
                  className="
                  text-cyan-400
                  font-bold
                "
                >
                  Score {pkg.risk_score}
                </span>

              </div>

            ))}

        </div>

      </div>

      {/* EXISTING TABLE */}

      <table className="w-full">

        <thead>

          <tr
            className="
            border-b
            border-cyan-900
          "
          >

            <th className="text-left py-4">
              Package
            </th>

            <th className="text-left py-4">
              Version
            </th>

            <th className="text-left py-4">
              Vulnerabilities
            </th>

            <th className="text-left py-4">
              Risk Score
            </th>

            <th className="text-left py-4">
              Risk
            </th>

          </tr>

        </thead>

        <tbody>

          {components
            .sort(
              (a, b) =>
                b.risk_score - a.risk_score
            )
            .map((pkg, idx) => (

              <tr
                key={idx}
                className="
                border-b
                border-cyan-950
              "
              >

                <td className="py-4">
                  {pkg.name}
                </td>

                <td className="py-4">
                  {pkg.version}
                </td>

                <td className="py-4">
                  {pkg.vulnerabilities}
                </td>

                <td className="py-4">

                  <div
                    className="
                    flex
                    items-center
                    gap-3
                  "
                  >

                    <div
                      className="
                      w-40
                      bg-slate-800
                      rounded-full
                      h-3
                    "
                    >

                      <div
                        className="
                        bg-cyan-400
                        h-3
                        rounded-full
                        "
                        style={{
                          width:
                            `${pkg.risk_score}%`
                        }}
                      />

                    </div>

                    {pkg.risk_score}

                  </div>

                </td>

                <td className="py-4">

                  <span
                    className={
                      pkg.risk === "CRITICAL"
                        ? "text-red-500 font-bold"
                        : pkg.risk === "HIGH"
                        ? "text-orange-400 font-bold"
                        : pkg.risk === "MEDIUM"
                        ? "text-yellow-400 font-bold"
                        : "text-green-400 font-bold"
                    }
                  >
                    {pkg.risk}
                  </span>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}