function calculateEGFR(patient) {

  const creatinine =
    patient.creatinine || 1.5;

  const age =
    patient.age;

  let egfr =
    186 *
    Math.pow(creatinine, -1.154) *
    Math.pow(age, -0.203);

  return Number(
    egfr.toFixed(1)
  );
}

module.exports =
  calculateEGFR;