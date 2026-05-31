interface Props {
  finding: any;
  onClose: () => void;
}

export default function FindingDrawer({
  finding,
  onClose,
}: Props) {

  if (!finding) return null;

  return (

    <div className="fixed top-0 right-0 w-[520px] h-screen bg-[#071427] border-l border-slate-800 shadow-2xl z-50 overflow-y-auto">

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            Vulnerability Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl"
          >
            ×
          </button>

        </div>

        <div className="space-y-6">

          <div>
            <div className="text-slate-400 mb-2">Tool</div>
            <div className="text-xl">{finding.tool}</div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">CVE / Finding</div>
            <div className="text-xl font-semibold text-red-400">
              {finding.title}
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">Severity</div>
            <div className="text-xl">
              {finding.severity}
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">Affected File</div>
            <div className="break-all text-slate-200">
              {finding.file_path}
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">CWE Mapping</div>
            <div className="text-white">
              CWE-79 Improper Input Validation
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">EPSS Score</div>
            <div className="text-red-400 font-bold">
              0.91
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">Exploitability</div>
            <div className="text-yellow-400">
              Public Exploit Available
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2">
              Remediation
            </div>

            <div className="bg-[#0B1120] border border-slate-700 rounded-xl p-5 text-slate-200 leading-8">

              Upgrade vulnerable dependency to latest secure version.
              <br /><br />
              Apply secure coding validation controls.
              <br /><br />
              Restrict insecure transport and update packages.

            </div>

          </div>

          <button className="w-full bg-red-600 hover:bg-red-500 transition py-4 rounded-xl font-bold text-lg">
            Create Jira Ticket
          </button>

        </div>

      </div>

    </div>
  );
}