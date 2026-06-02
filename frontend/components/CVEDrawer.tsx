"use client";

interface Props {
  finding: any;
  onClose: () => void;
}

export default function CVEDrawer({
  finding,
  onClose
}: Props) {

  if (!finding) return null;

  return (

    <div className="fixed inset-0 z-50">

      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-[700px]
        bg-gradient-to-b
        from-[#081224]
        to-[#10244d]
        border-l
        border-blue-800
        shadow-2xl
        overflow-auto
        p-8
        "
      >

        <button
          onClick={onClose}
          className="
          float-right
          text-slate-400
          hover:text-white
          text-2xl
          "
        >
          ✕
        </button>

        <h2 className="text-4xl font-bold text-red-300 mb-8">
          Vulnerability Intelligence
        </h2>

        <div className="space-y-6">

          <div className="bg-[#0d1b38] rounded-xl p-5">

            <div className="text-slate-400 mb-2">
              CVE
            </div>

            <div className="text-white text-xl font-bold">
              {finding.title}
            </div>

          </div>

          <div className="bg-[#0d1b38] rounded-xl p-5">

            <div className="text-slate-400 mb-2">
              Severity
            </div>

            <div className="text-red-400 font-bold">
              {finding.severity}
            </div>

          </div>

          <div className="bg-[#0d1b38] rounded-xl p-5">

            <div className="text-slate-400 mb-2">
              Security Tool
            </div>

            <div className="text-white">
              {finding.tool}
            </div>

          </div>

          <div className="bg-[#0d1b38] rounded-xl p-5">

            <div className="text-slate-400 mb-2">
              File Path
            </div>

            <div className="text-white break-all">
              {finding.file_path}
            </div>

          </div>

          <div className="bg-[#0d1b38] rounded-xl p-5">

            <div className="text-slate-400 mb-2">
              Description
            </div>

            <div className="text-white">
              {finding.description}
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}