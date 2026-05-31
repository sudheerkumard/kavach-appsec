"use client";

interface Props {
  components: any[];
}

export default function LicenseDashboard({
  components,
}: Props) {

  return (

    <div>

      <h3 className="text-2xl font-bold mb-4">
        License Compliance
      </h3>

      <table className="w-full">

        <thead>

          <tr className="text-cyan-400">

            <th className="p-3 text-left">
              Package
            </th>

            <th className="p-3 text-left">
              License
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {components.map((pkg) => (

            <tr
              key={pkg.name}
              className="border-t border-cyan-900"
            >

              <td className="p-3">
                {pkg.name}
              </td>

              <td className="p-3">
                {pkg.license}
              </td>

              <td className="p-3 text-green-400">
                Approved
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}