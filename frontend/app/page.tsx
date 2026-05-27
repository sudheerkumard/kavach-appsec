export default function Dashboard() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Kavach AppSec Dashboard
      </h1>

      <p className="mt-4 text-lg">
        Enterprise DevSecOps Security Platform
      </p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="border p-6 rounded-xl">
          <h2 className="font-semibold">SAST</h2>
          <p>Static code analysis engine</p>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="font-semibold">Secrets Detection</h2>
          <p>Credential leakage scanning</p>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="font-semibold">IaC Security</h2>
          <p>Terraform / K8s misconfiguration checks</p>
        </div>
      </div>
    </main>
  );
}