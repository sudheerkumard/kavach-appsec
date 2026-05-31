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
        bg-[#071326]
        border
        border-cyan-900
        rounded-2xl
        p-8
      "
    >

      <h2 className="text-3xl font-bold text-white mb-6">
        Tool Risk Heatmap
      </h2>

      <div className="grid grid-cols-4 gap-4">

        {Object.entries(
          dashboard.tool_distribution
        ).map(([tool, value]: any) => (

          <div
            key={tool}
            onClick={() => onToolClick?.(tool)}
            className="
              bg-[#0b1d36]
              rounded-xl
              p-5
              text-center
              border
              border-cyan-900
              cursor-pointer
              hover:border-cyan-400
              hover:scale-[1.03]
              transition
            "
          >

            <div className="text-white font-semibold">
              {tool}
            </div>

            <div className="text-5xl font-bold text-cyan-400 mt-4">
              {value}
            </div>

          </div>

        ))}

      </div>

    </div>

  );
}