"use client";

export default function EnterpriseReportButton() {

  const download = () => {

    window.open(
      "http://localhost:8000/api/enterprise-report/pdf",
      "_blank"
    );

  };

  return (

    <button
      onClick={download}
      className="
      bg-red-600
      hover:bg-red-700
      px-6
      py-3
      rounded-xl
      font-semibold
      text-white
      shadow-lg
      "
    >
      Generate Executive Security Report
    </button>

  );

}