"use client";

import { useEffect, useState } from "react";

interface Props {
  finding: any;
  onClose: () => void;
}

export default function RemediationDrawer({
  finding,
  onClose,
}: Props) {

  const [data, setData] = useState<any>(null);

  useEffect(() => {

    if (!finding) return;

    fetch(
      `http://localhost:8000/api/remediation/${finding.id}`
    )
      .then((res) => res.json())
      .then((result) => {

        setData(result);

      })
      .catch(console.error);

  }, [finding]);

  if (!finding) return null;

  if (!data) {

    return (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

        <div className="text-white text-xl">
          Loading AI Remediation...
        </div>

      </div>

    );

  }

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
        w-[760px]
        bg-[#071326]
        border-l
        border-cyan-900
        p-8
        overflow-y-auto
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

        <h2 className="text-4xl font-bold mb-8">
          AI Remediation Assistant
        </h2>

        <div className="space-y-8">

          <div>

            <div className="text-slate-400 mb-2">
              Finding
            </div>

            <div className="text-cyan-400 text-xl font-bold">
              {finding.title}
            </div>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              Severity
            </div>

            <div className="text-red-400 font-semibold">
              {finding.severity}
            </div>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              Root Cause
            </div>

            <div className="bg-[#020817] p-4 rounded-xl">
              {data.root_cause}
            </div>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              Affected Package
            </div>

            <div className="bg-[#020817] p-4 rounded-xl">
              {data.package}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <div className="text-slate-400 mb-2">
                Current Version
              </div>

              <div className="bg-[#020817] p-4 rounded-xl">
                {data.current_version}
              </div>

            </div>

            <div>

              <div className="text-slate-400 mb-2">
                Fixed Version
              </div>

              <div className="bg-[#020817] p-4 rounded-xl text-green-400">
                {data.fixed_version}
              </div>

            </div>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              Upgrade Command
            </div>

            <pre
              className="
                bg-black
                p-4
                rounded-xl
                overflow-auto
                text-green-400
              "
            >
              {data.upgrade_command}
            </pre>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              OWASP Mapping
            </div>

            <div className="bg-[#020817] p-4 rounded-xl">
              {data.owasp}
            </div>

          </div>

          <div>

            <div className="text-slate-400 mb-2">
              Verification Steps
            </div>

            <div className="bg-[#020817] p-4 rounded-xl">

              <ul className="list-disc ml-5 space-y-2">

                {data.verification?.map(
                  (step: string, idx: number) => (

                    <li key={idx}>
                      {step}
                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

          <button
            className="
              mt-6
              bg-blue-600
              hover:bg-blue-500
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Create Jira Ticket
          </button>

        </div>

      </div>

    </div>

  );

}