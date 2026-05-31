export default function AssetInventory() {

  const assets = [
    {
      repo: "NodeGoat",
      language: "NodeJS",
      risk: "HIGH"
    },
    {
      repo: "Terraform-IaC",
      language: "Terraform",
      risk: "CRITICAL"
    }
  ];

  return (

    <div className="bg-[#071427] rounded-2xl border border-slate-800 p-8">

      <h2 className="text-3xl font-bold mb-8">
        Asset Inventory
      </h2>

      <div className="space-y-4">

        {assets.map((asset, idx) => (

          <div
            key={idx}
            className="bg-[#08111f] p-5 rounded-xl"
          >

            <div className="font-bold text-xl">
              {asset.repo}
            </div>

            <div className="text-slate-400">
              {asset.language}
            </div>

            <div className="text-red-400">
              {asset.risk}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}