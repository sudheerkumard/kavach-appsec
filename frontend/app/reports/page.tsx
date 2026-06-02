"use client";

export default function ReportsPage() {
  const generateReport = () => {
    window.open(
      "http://localhost:8000/api/executive-report/pdf",
      "_blank"
    );
  };

  return (
    <main className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Reports Center
      </h1>

      <div className="bg-[#071326] p-8 rounded-xl">
        <h2 className="text-2xl font-bold">
          Executive Security Report
        </h2>

        <p className="mt-4 text-slate-400">
          Enterprise-wide security summary.
        </p>

        <button
          onClick={generateReport}
          className="
            mt-6
            bg-cyan-500
            text-black
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >
          Generate Executive Report
        </button>
      </div>
    </main>
  );
}