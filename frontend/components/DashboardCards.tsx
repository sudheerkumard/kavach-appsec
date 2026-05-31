interface Props {
  dashboard: any;
  onCardClick?: (type: string) => void;
}

export default function DashboardCards({
  dashboard,
  onCardClick,
}: Props) {

  const cards = [

    {
      title: "Repositories",
      value: dashboard.repositories,
      color: "text-white",
      border: "border-cyan-900",
      key: "repositories",
    },

    {
      title: "Scans",
      value: dashboard.scans,
      color: "text-white",
      border: "border-cyan-900",
      key: "scans",
    },

    {
      title: "Findings",
      value: dashboard.findings,
      color: "text-white",
      border: "border-cyan-900",
      key: "findings",
    },

    {
      title: "Critical",
      value: dashboard.critical,
      color: "text-red-400",
      border: "border-red-600",
      key: "critical",
    },

  ];

  return (

    <div className="grid grid-cols-4 gap-6 mb-10">

      {cards.map((card) => (

        <div
          key={card.title}
          onClick={() => onCardClick?.(card.key)}
          className={`
            bg-[#071326]
            rounded-2xl
            border
            ${card.border}
            p-8
            cursor-pointer
            hover:shadow-xl
            hover:scale-[1.02]
            transition
          `}
        >

          <p className="text-slate-400 text-lg">
            {card.title}
          </p>

          <h2 className={`text-6xl font-bold mt-5 ${card.color}`}>
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );
}