export default function ScanLauncher() {

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

      <h2 className="text-4xl font-bold text-white mb-8">
        Launch Security Scan
      </h2>

      <div className="flex gap-4">

        <input
          placeholder="https://github.com/org/repo.git"
          className="
            flex-1
            bg-[#020817]
            border
            border-cyan-900
            rounded-xl
            px-5
            py-4
            text-white
          "
        />

        <button
          className="
            px-8
            bg-cyan-500
            hover:bg-cyan-400
            rounded-xl
            font-semibold
            text-black
          "
        >
          Start Scan
        </button>

      </div>

    </div>

  );
}