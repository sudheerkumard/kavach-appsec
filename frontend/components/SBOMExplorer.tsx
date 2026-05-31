"use client";

interface Props {
  components: any[];
}

export default function SBOMExplorer({
  components,
}: Props) {

  return (

    <div>

      <h3 className="text-2xl font-bold mb-4">
        Software Bill of Materials
      </h3>

      <table className="w-full">

        <thead>

          <tr className="text-cyan-400">

            <th className="text-left p-3">
              Package
            </th>

            <th className="text-left p-3">
              Version
            </th>

            <th className="text-left p-3">
              License
            </th>

            <th className="text-left p-3">
              Vulnerabilities
            </th>

          </tr>

        </thead>

        <tbody>

          {components.map((item) => (

            <tr
              key={item.name}
              className="border-t border-cyan-900"
            >

              <td className="p-3">
                {item.name}
              </td>

              <td className="p-3">
                {item.version}
              </td>

              <td className="p-3">
                {item.license}
              </td>

              <td className="p-3 text-red-400">
                {item.vulnerabilities}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}