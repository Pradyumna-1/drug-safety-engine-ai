function DemoScenarioCard({
  title,
  drug,
  onRun
}: any) {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-5
      border
      border-gray-200
      hover:shadow-lg
      transition
    ">

      <h3 className="
        text-lg
        font-bold
        mb-3
      ">

        {title}

      </h3>

      <div className="
        mb-4
      ">

        <p className="
          text-sm
          text-gray-500
          mb-1
        ">

          Test Drug

        </p>

        <p className="
          font-medium
        ">

          {drug}

        </p>

      </div>

      <button
        onClick={onRun}
        className="
          w-full
          bg-black
          text-white
          py-2
          rounded-lg
          hover:bg-gray-800
        "
      >

        Run Demo Scenario

      </button>

    </div>
  );
}

export default DemoScenarioCard;