function SafetyAlerts({
  result
}: any) {

  if (!result) {

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

          Safety Alerts

        </h2>

        <p className="
          text-gray-500
        ">

          No analysis performed yet.

        </p>

      </div>
    );
  }

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
        mb-6
      ">

        Clinical Safety Analysis

      </h2>

      {/* SCORE SECTION */}

      <div className="
        grid
        grid-cols-2
        gap-4
        mb-6
      ">

        <div className="
          bg-slate-100
          rounded-xl
          p-4
        ">

          <p className="
            text-sm
            text-gray-500
            mb-1
          ">

            eGFR

          </p>

          <p className="
            text-2xl
            font-bold
          ">

            {result.egfr}

          </p>

        </div>

        <div className="
          bg-slate-100
          rounded-xl
          p-4
        ">

          <p className="
            text-sm
            text-gray-500
            mb-1
          ">

            CHA₂DS₂-VASc

          </p>

          <p className="
            text-2xl
            font-bold
          ">

            {result.score}

          </p>

        </div>

      </div>

      {/* INTERACTIONS */}

      <div className="
        mb-6
      ">

        <h3 className="
          text-xl
          font-bold
          mb-4
        ">

          Drug Interactions

        </h3>

        {
          result.interactions?.length > 0

            ?

            result.interactions.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-xl
                    p-4
                    mb-4
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-2
                  ">

                    <p className="
                      font-bold
                      text-red-700
                    ">

                      ⛔ {item.severity}

                    </p>

                  </div>

                  <p className="
                    font-medium
                    mb-2
                  ">

                    {item.drug_a_name}
                    {" + "}
                    {item.drug_b_name}

                  </p>

                  <p className="
                    text-gray-700
                    mb-2
                  ">

                    {item.clinical_effect}

                  </p>

                  <p className="
                    text-sm
                    text-gray-600
                  ">

                    {item.management}

                  </p>

                </div>
              )
            )

            :

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            ">

              <p className="
                text-green-700
                font-medium
              ">

                No major interaction detected.

              </p>

            </div>
        }

      </div>

      {/* ALLERGIES */}

      <div className="
        mb-6
      ">

        <h3 className="
          text-xl
          font-bold
          mb-4
        ">

          Allergy Conflicts

        </h3>

        {
          result.allergies?.length > 0

            ?

            result.allergies.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    bg-yellow-50
                    border
                    border-yellow-200
                    rounded-xl
                    p-4
                    mb-4
                  "
                >

                  <p className="
                    font-bold
                    text-yellow-700
                    mb-2
                  ">

                    ⚠️ Allergy Warning

                  </p>

                  <p className="
                    text-gray-700
                    mb-2
                  ">

                    {item.cross_reacts_with}

                  </p>

                  <p className="
                    text-sm
                    text-gray-600
                  ">

                    {item.guidance}

                  </p>

                </div>
              )
            )

            :

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            ">

              <p className="
                text-green-700
                font-medium
              ">

                No allergy conflicts detected.

              </p>

            </div>
        }

      </div>

      {/* RENAL */}

      <div className="
        mb-6
      ">

        <h3 className="
          text-xl
          font-bold
          mb-4
        ">

          Renal Dosing

        </h3>

        {
          result.renal

            ?

            <div className="
              bg-orange-50
              border
              border-orange-200
              rounded-xl
              p-4
            ">

              <p className="
                font-bold
                text-orange-700
                mb-2
              ">

                ⚠️ Renal Warning

              </p>

              <p className="
                mb-2
              ">

                {result.renal.drug}

              </p>

              <p className="
                text-sm
                text-gray-700
              ">

                {
                  result.renal
                    .recommendation
                }

              </p>

            </div>

            :

            <div className="
              bg-green-50
              border
              border-green-200
              rounded-xl
              p-4
            ">

              <p className="
                text-green-700
                font-medium
              ">

                No renal dosing issues detected.

              </p>

            </div>
        }

      </div>

      {/* AI SUMMARY */}

      <div>

        <h3 className="
          text-xl
          font-bold
          mb-4
        ">

          Safety Constraint Summary

        </h3>

        <div className="
          bg-blue-50
          border
          border-blue-200
          rounded-xl
          p-4
        ">

          <pre className="
            whitespace-pre-wrap
            text-sm
            text-gray-700
            font-sans
          ">

            {
              result.constraints ||

              "No constraints generated."
            }

          </pre>

        </div>

      </div>

    </div>
  );
}

export default SafetyAlerts;