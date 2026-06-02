export default function Header() {

return (

<div className="mb-10">

  <div className="flex items-center gap-4">

    <div
      className="
      w-16
      h-16
      rounded-xl
      bg-gradient-to-br
      from-red-600
      to-blue-700
      flex
      items-center
      justify-center
      text-white
      text-2xl
      font-bold
      shadow-lg
      "
    >
      AK
    </div>

    <div>

      <h1 className="text-5xl font-bold text-white">
        Aegis DevSecOps Model
      </h1>

      <p className="text-red-400 font-semibold mt-1">
        Aegis Data Kavach
      </p>

    </div>

  </div>

  <p className="text-slate-300 mt-4 text-lg">
    Enterprise DevSecOps • Application Security • SBOM • Risk Analytics
  </p>

</div>

);

}
