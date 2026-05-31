interface Props {
  dashboard: any;
}

export default function SeverityChart({
  dashboard,
}: Props) {

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
        Severity Distribution
      </h2>

      <div className="space-y-4">

        {Object.entries(
          dashboard.severity_distribution
        ).map(([sev, count]: any) => (

          <div key={sev}>

            <div className="flex justify-between text-white">

              <span>{sev}</span>

              <span>{count}</span>

            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full mt-2">

              <div
                className="h-3 bg-cyan-500 rounded-full"
                style={{
                  width: `${count / dashboard.findings * 100}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}