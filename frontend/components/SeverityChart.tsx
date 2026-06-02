interface Props {
dashboard: any;
}

export default function SeverityChart({
dashboard,
}: Props) {

const getColor = (severity: string) => {

switch (severity.toUpperCase()) {

  case "CRITICAL":
    return "bg-red-600";

  case "HIGH":
    return "bg-red-400";

  case "MEDIUM":
    return "bg-blue-500";

  case "LOW":
    return "bg-blue-300";

  default:
    return "bg-slate-500";
}

};

return (

<div
  className="
  bg-[#081224]
  border
  border-blue-800
  rounded-2xl
  p-8
  shadow-lg
  "
>

  <h2 className="text-3xl font-bold text-white mb-6">
    Severity Distribution
  </h2>

  <div className="space-y-5">

    {Object.entries(
      dashboard.severity_distribution
    ).map(([sev, count]: any) => (

      <div key={sev}>

        <div className="flex justify-between text-white mb-2">

          <span className="font-medium">
            {sev}
          </span>

          <span className="font-bold">
            {count}
          </span>

        </div>

        <div className="w-full h-4 bg-slate-800 rounded-full">

          <div
            className={`h-4 rounded-full ${getColor(sev)}`}
            style={{
              width: `${(count / dashboard.findings) * 100}%`
            }}
          />

        </div>

      </div>

    ))}

  </div>

</div>

);

}
