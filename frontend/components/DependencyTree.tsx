"use client";

interface Props {
  dependencies: any[];
}

export default function DependencyTree({
  dependencies,
}: Props) {

  return (

    <div>

      <h3 className="text-2xl font-bold mb-4">
        Dependency Tree
      </h3>

      <div className="space-y-3">

        {dependencies.map((dep, idx) => (

          <div
            key={idx}
            className="
              bg-[#020817]
              p-4
              rounded-xl
            "
          >

            {dep.parent}

            <span className="mx-3 text-cyan-400">
              →
            </span>

            {dep.child}

          </div>

        ))}

      </div>

    </div>

  );

}