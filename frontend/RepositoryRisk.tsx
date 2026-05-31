interface Props {
  repositories: any[];
  onRepoClick?: (repo: any) => void;
}

export default function RepositoryRisk({
  repositories,
  onRepoClick,
}: Props) {

  return (

    <div
      className="
      bg-[#071326]
      border
      border-cyan-900
      rounded-2xl
      p-8
      "
    >

      <h2 className="text-5xl font-bold text-white">
        Repository Risk Ranking
      </h2>

      <p className="text-gray-400 mt-2 mb-8">
        Risk scoring based on findings severity distribution
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {repositories.map((repo) => (

          <div
            key={repo.id}
            onClick={() => onRepoClick?.(repo)}
            className="
              bg-[#0b1d36]
              border
              border-cyan-900
              rounded-2xl
              p-6
              cursor-pointer
              hover:border-cyan-400
              transition
            "
          >

            <div className="flex justify-between">

              <div>

                <h3 className="text-3xl font-bold text-white">
                  {repo.name}
                </h3>

                <p className="text-cyan-400 mt-2">
                  {repo.repo_url}
                </p>

              </div>

              <div>

                <div
                  className="
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  bg-red-600
                  text-white
                  "
                >
                  {repo.risk}
                </div>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Security Score
                </span>

                <span className="text-5xl font-bold text-cyan-400">
                  {repo.score}
                </span>

              </div>

              <div className="w-full h-4 bg-slate-700 rounded-full mt-4">

                <div
                  className="h-4 bg-cyan-400 rounded-full"
                  style={{
                    width: `${repo.score}%`
                  }}
                />

              </div>

            </div>

            <div className="grid grid-cols-4 gap-3 mt-6">

              <div className="bg-[#020817] rounded-xl p-4 text-center">
                <div className="text-red-400 text-3xl font-bold">
                  {repo.critical}
                </div>
                <div className="text-sm">Critical</div>
              </div>

              <div className="bg-[#020817] rounded-xl p-4 text-center">
                <div className="text-orange-400 text-3xl font-bold">
                  {repo.high}
                </div>
                <div className="text-sm">High</div>
              </div>

              <div className="bg-[#020817] rounded-xl p-4 text-center">
                <div className="text-yellow-400 text-3xl font-bold">
                  {repo.medium}
                </div>
                <div className="text-sm">Medium</div>
              </div>

              <div className="bg-[#020817] rounded-xl p-4 text-center">
                <div className="text-green-400 text-3xl font-bold">
                  {repo.low}
                </div>
                <div className="text-sm">Low</div>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}