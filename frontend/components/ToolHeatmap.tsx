interface Props {
dashboard: any;
onToolClick?: (tool: string) => void;
}

export default function ToolHeatmap({
dashboard,
onToolClick,
}: Props) {

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
    Security Tool Analytics
  </h2>

  <div className="grid grid-cols-4 gap-4">

    {Object.entries(
      dashboard.tool_distribution
    ).map(([tool, value]: any) => (

      <div
        key={tool}
        onClick={() => onToolClick?.(tool)}
        className="
        bg-gradient-to-br
        from-blue-900
        to-slate-900
        rounded-xl
        p-5
        text-center
        border
        border-blue-700
        cursor-pointer
        hover:border-red-500
        hover:scale-105
        hover:shadow-xl
        transition-all
        "
      >

        <div className="text-white font-semibold text-lg">
          {tool}
        </div>

        <div className="text-5xl font-bold text-red-400 mt-4">
          {value}
        </div>

      </div>

    ))}

  </div>

</div>

);

}
