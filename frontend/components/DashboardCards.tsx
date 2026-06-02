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
  bg: "bg-gradient-to-br from-blue-900 to-blue-700",
  key: "repositories",
},

{
  title: "Scans",
  value: dashboard.scans,
  bg: "bg-gradient-to-br from-slate-800 to-blue-900",
  key: "scans",
},

{
  title: "Findings",
  value: dashboard.findings,
  bg: "bg-gradient-to-br from-blue-800 to-slate-900",
  key: "findings",
},

{
  title: "Critical",
  value: dashboard.critical,
  bg: "bg-gradient-to-br from-red-900 to-red-600",
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
        ${card.bg}
        rounded-2xl
        p-8
        cursor-pointer
        shadow-lg
        hover:scale-105
        hover:shadow-2xl
        transition-all
      `}
    >

      <p className="text-slate-200 text-lg">
        {card.title}
      </p>

      <h2 className="text-6xl font-bold text-white mt-5">
        {card.value}
      </h2>

    </div>

  ))}

</div>

);

}
