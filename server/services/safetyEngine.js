const supabase =
  require("../utils/supabase");

async function checkDrugInteractions(
  newDrug,
  medications
) {

  try {

    const alerts = [];

    const normalizedDrug =
      String(newDrug)
        .toLowerCase()
        .trim();

    const { data, error } =
      await supabase
        .from("drug_interactions")
        .select("*");

    if (error) {

      console.log(
        "INTERACTION ERROR"
      );

      console.log(error);

      return [];
    }

    for (
      const med of
      (medications || [])
    ) {

      const normalizedMed =
        String(med)
          .toLowerCase()
          .trim();

      const matches =
        data.filter(item => {

          const a =
            String(item.drug_a_name)
              .toLowerCase()
              .trim();

          const b =
            String(item.drug_b_name)
              .toLowerCase()
              .trim();

          return (

            (
              a === normalizedDrug &&
              b === normalizedMed
            )

            ||

            (
              a === normalizedMed &&
              b === normalizedDrug
            )
          );
        });

      alerts.push(...matches);
    }

    const uniqueAlerts =
      alerts.filter(
        (value, index, self) =>

          index ===
          self.findIndex(
            item => (

              item.drug_a_name ===
              value.drug_a_name

              &&

              item.drug_b_name ===
              value.drug_b_name
            )
          )
      );

    console.log(
      "FINAL INTERACTIONS"
    );

    console.log(
      uniqueAlerts
    );

    return uniqueAlerts;

  } catch (error) {

    console.log(error);

    return [];
  }
}

async function checkAllergyConflicts(
  newDrug,
  allergies
) {

  try {

    const alerts = [];

    const normalizedDrug =
      String(newDrug)
        .toLowerCase()
        .trim();

    for (
      const allergy of
      (allergies || [])
    ) {

      const { data, error } =
        await supabase
          .from(
            "allergy_cross_reactivity"
          )
          .select("*")
          .ilike(
            "allergy_class",
            allergy
          );

      if (error) {

        console.log(
          "ALLERGY ERROR"
        );

        console.log(error);

        continue;
      }

      if (
        data &&
        data.length > 0
      ) {

        const matches =
          data.filter(item => {

            return String(
              item.cross_reacts_with
            )
              .toLowerCase()
              .trim()
              .includes(
                normalizedDrug
              );
          });

        alerts.push(...matches);
      }
    }

    console.log(
      "ALLERGY ALERTS"
    );

    console.log(alerts);

    return alerts;

  } catch (error) {

    console.log(error);

    return [];
  }
}

async function checkRenalDosing(
  newDrug,
  egfr
) {

  try {

    const { data, error } =
      await supabase
        .from("drugs")
        .select("*")
        .ilike(
          "generic_name",
          newDrug
        );

    if (error) {

      console.log(
        "RENAL ERROR"
      );

      console.log(error);

      return null;
    }

    if (
      !data ||
      data.length === 0
    ) {

      return null;
    }

    const drug =
      data[0];

    if (
      egfr <
      drug.renal_dosing
        .threshold
    ) {

      return {

        drug: newDrug,

        recommendation:
          drug.renal_dosing
            .recommendation
      };
    }

    return null;

  } catch (error) {

    console.log(error);

    return null;
  }
}

function generateConstraintText(
  interactions,
  allergies,
  renal
) {

  let text = "";

  interactions.forEach(item => {

    text +=
      `⛔ ${item.severity}\n`;

    text +=
      `${item.drug_a_name} + ${item.drug_b_name}\n`;

    text +=
      `${item.clinical_effect}\n`;

    text +=
      `${item.management}\n\n`;
  });

  allergies.forEach(item => {

    text +=
      `⛔ ALLERGY BLOCK\n`;

    text +=
      `${item.allergy_class} → ${item.cross_reacts_with}\n`;

    text +=
      `${item.guidance}\n\n`;
  });

  if (renal) {

    text +=
      `⚠️ RENAL WARNING\n`;

    text +=
      `${renal.drug}\n`;

    text +=
      `${renal.recommendation}\n\n`;
  }

  if (!text) {

    text =
      "No major safety constraints detected.";
  }

  return text;
}

module.exports = {

  checkDrugInteractions,

  checkAllergyConflicts,

  checkRenalDosing,

  generateConstraintText
};