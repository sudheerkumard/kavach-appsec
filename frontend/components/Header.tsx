export default function Header() {

  return (

    <div>

      <div className="flex items-center">

        <img
          src="/yash-logo.png"
          alt="YASH DevSecOps"
          className="w-90 h-auto object-contain"
        />

        <div className="ml-12">

          <div className="flex items-center gap-4">

            <h1 className="text-5xl font-bold text-white">
              YASH DevSecOps Model
            </h1>

            <span className="text-slate-500 text-3xl">
              |
            </span>

            <span className="text-red-400 font-semibold text-2xl">
              Aegis Data Kavach
            </span>

          </div>

          <p className="text-slate-300 text-lg mt-4">
            Enterprise DevSecOps Platform • SAST • SCA • SBOM • IaC Security • Secrets Detection • Executive Risk Analytics
          </p>

        </div>

      </div>

    </div>

  );

}