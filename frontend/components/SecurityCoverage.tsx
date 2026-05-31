export default function SecurityCoverage() {

  return (
    <div className="bg-[#041633] border border-cyan-900 rounded-2xl p-8 shadow-xl h-full">

      <h2 className="text-3xl font-bold mb-6">
        Security Coverage
      </h2>

      <div className="space-y-4 text-lg">

        <p>✓ SAST Analysis (Semgrep)</p>

        <p>✓ Secret Detection (Gitleaks)</p>

        <p>✓ IaC Scanning (Checkov)</p>

        <p>✓ SCA Vulnerability Scanning (Trivy)</p>

        <p>✓ Findings Management</p>

      </div>
    </div>
  );
}