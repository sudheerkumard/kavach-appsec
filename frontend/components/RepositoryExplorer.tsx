"use client";

import { useEffect, useState } from "react";

export default function RepositoryExplorer() {

  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {

    fetch("http://localhost:8000/api/repositories/")
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setRepos(data);
        } else if (data.items) {
          setRepos(data.items);
        }

      })
      .catch(console.error);

  }, []);

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

      <h2 className="text-3xl font-bold text-white mb-6">
        Repository Explorer
      </h2>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="text-cyan-400 border-b border-cyan-900">

              <th className="text-left p-4">
                Repository
              </th>

              <th className="text-left p-4">
                URL
              </th>

              <th className="text-left p-4">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {repos.map((repo) => (

              <tr
                key={repo.id}
                className="
                  border-b
                  border-cyan-950
                "
              >

                <td className="p-4 text-white">
                  {repo.name}
                </td>

                <td className="p-4 text-slate-300">
                  {repo.repo_url}
                </td>

                <td className="p-4 text-slate-400">
                  {repo.created_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}