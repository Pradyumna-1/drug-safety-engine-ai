function calculateCHA2DS2VASc(
  patient
) {

  let score = 0;

  if (patient.age >= 65) {

    score += 1;
  }

  if (patient.age >= 75) {

    score += 1;
  }

  if (
    patient.conditions?.includes(
      "hypertension"
    )
  ) {

    score += 1;
  }

  if (
    patient.conditions?.includes(
      "diabetes"
    )
  ) {

    score += 1;
  }

  return score;
}

module.exports =
  calculateCHA2DS2VASc;