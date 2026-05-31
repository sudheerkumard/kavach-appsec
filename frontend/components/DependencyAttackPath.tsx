"use client";

interface Props {
  dependencies: any[];
}

export default function DependencyAttackPath({
  dependencies,
}: Props) {

  const expressChildren =
    dependencies.filter(
      (d) => d.parent === "express"
    );

  const lodashChildren =
    dependencies.filter(
      (d) => d.parent === "lodash"
    );

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Dependency Attack Path
      </h2>

      <div
        className="
        bg-[#020817]
        rounded-xl
        p-6
        border
        border-cyan-950
      "
      >

        <div className="text-cyan-400 text-xl font-bold">
          express
        </div>

        {expressChildren.map((dep, idx) => (

          <div
            key={idx}
            className="
            ml-8
            mt-3
            text-white
          "
          >

            {dep.child === "lodash" ? (

              <>

                <div>
                  └── lodash
                  <span
                    className="
                    ml-3
                    text-red-500
                    font-bold
                  "
                  >
                    CRITICAL
                  </span>
                </div>

                {lodashChildren.map(
                  (child, childIdx) => (

                    <div
                      key={childIdx}
                      className="
                      ml-10
                      mt-2
                      text-slate-300
                    "
                    >
                      └── {child.child}
                    </div>

                  )
                )}

              </>

            ) : (

              <div>
                ├── {dep.child}
              </div>

            )}

          </div>

        ))}

      </div>

      <div
        className="
        mt-6
        bg-[#020817]
        rounded-xl
        p-5
      "
      >

        <h3
          className="
          text-xl
          font-bold
          mb-3
        "
        >
          Attack Path Summary
        </h3>

        <ul className="space-y-2">

          <li>
            Root Package: express
          </li>

          <li>
            Critical Dependency: lodash
          </li>

          <li>
            Transitive Dependency: tar
          </li>

          <li>
            Potential Blast Radius:
            4 packages
          </li>

        </ul>

      </div>

    </div>

  );

}