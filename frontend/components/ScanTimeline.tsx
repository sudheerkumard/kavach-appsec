export default function ScanTimeline() {

  const scans = [
    {
      repo: "NodeGoat",
      status: "Completed",
      date: "2026-05-28"
    },
    {
      repo: "juice-shop",
      status: "Running",
      date: "2026-05-28"
    }
  ];

  return (

    <div className="bg-[#071427] rounded-2xl border border-slate-800 p-8">

      <h2 className="text-3xl font-bold mb-8">
        Scan Timeline
      </h2>

      <div className="space-y-6">

        {scans.map((scan, idx) => (

          <div
            key={idx}
            className="border-l-4 border-cyan-500 pl-6"
          >

            <div className="text-xl font-semibold">
              {scan.repo}
            </div>

            <div className="text-slate-400">
              {scan.status}
            </div>

            <div className="text-slate-500 text-sm">
              {scan.date}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}