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
      bg-red-500
      px-5
      py-3
      rounded-xl
      font-semibold
      text-white
      "
    >
      Export Enterprise Report
    </button>

  );

}