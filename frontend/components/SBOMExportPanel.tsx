"use client";

interface Props {
  repoId: number;
}

export default function SBOMExportPanel({
  repoId,
}: Props) {

  const download = (
    format: string
  ) => {

    window.open(
      `http://localhost:8000/api/sbom/export/${repoId}/${format}`,
      "_blank"
    );

  };

  return (

    <div
      className="
      flex
      gap-3
      flex-wrap
      mb-6
    "
    >

      <button
        onClick={() => download("json")}
        className="
        px-4 py-2
        rounded-xl
        bg-cyan-500
        text-black
        font-semibold
        "
      >
        Export JSON
      </button>

      <button
        onClick={() => download("cyclonedx")}
        className="
        px-4 py-2
        rounded-xl
        bg-green-500
        text-black
        font-semibold
        "
      >
        Export CycloneDX
      </button>

      <button
        onClick={() => download("spdx")}
        className="
        px-4 py-2
        rounded-xl
        bg-orange-500
        text-black
        font-semibold
        "
      >
        Export SPDX
      </button>

      <button
        onClick={() => download("csv")}
        className="
        px-4 py-2
        rounded-xl
        bg-purple-500
        text-white
        font-semibold
        "
      >
        Export CSV
      </button>

      <button
        onClick={() => download("pdf")}
        className="
        px-4 py-2
        rounded-xl
        bg-red-500
        text-white
        font-semibold
        "
      >
        Export PDF
      </button>

    </div>

  );

}