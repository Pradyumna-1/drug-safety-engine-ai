function PatientCard({
  patient
}: any) {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">

        {patient.name}

      </h2>

      <div className="
        space-y-3
      ">

        <p>

          <span className="
            font-semibold
          ">
            Age:
          </span>

          {" "}

          {patient.age}

        </p>

        <p>

          <span className="
            font-semibold
          ">
            Sex:
          </span>

          {" "}

          {patient.sex}

        </p>

        <div>

          <p className="
            font-semibold
            mb-2
          ">

            Medications

          </p>

          <div className="
            flex
            flex-wrap
            gap-2
          ">

            {
              patient.medications.map(
                (
                  med: string,
                  index: number
                ) => (

                  <span
                    key={index}
                    className="
                      bg-blue-100
                      text-blue-800
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "
                  >

                    {med}

                  </span>
                )
              )
            }

          </div>

        </div>

        <div>

          <p className="
            font-semibold
            mb-2
          ">

            Allergies

          </p>

          <div className="
            flex
            flex-wrap
            gap-2
          ">

            {
              patient.allergies.map(
                (
                  allergy: string,
                  index: number
                ) => (

                  <span
                    key={index}
                    className="
                      bg-red-100
                      text-red-800
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "
                  >

                    {allergy}

                  </span>
                )
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default PatientCard;