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

    <div className="
      fixed
      top-0
      right-0
      h-screen
      w-[600px]
      bg-[#071326]
      border-l
      border-cyan-900
      shadow-2xl
      z-50
      overflow-auto
      p-8
    ">

      <button
        onClick={onClose}
        className="
          bg-red-600
          px-4
          py-2
          rounded
          text-white
        "
      >
        Close
      </button>

      <h2 className="
        text-3xl
        font-bold
        mt-6
        text-cyan-400
      ">
        {finding.title}
      </h2>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-gray-400">
            Severity
          </p>

          <p className="text-white">
            {finding.severity}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Tool
          </p>

          <p className="text-white">
            {finding.tool}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            File
          </p>

          <p className="text-white">
            {finding.file_path}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Description
          </p>

          <p className="text-white">
            {finding.description}
          </p>
        </div>

      </div>

    </div>

  );
}