const safetyEngine =
  require("../services/safetyEngine");

const calculateEGFR =
  require("../utils/calculateEGFR");

const calculateCHA2DS2VASc =
  require("../utils/calculateCHA2DS2VASc");

const {
  generateGenericAI,
  generateEnhancedAI
} = require(
  "../services/llmService"
);

const runSafetyCheck =
  async (req, res) => {

    try {

      const {
        patient,
        newDrug
      } = req.body;

      // =========================
      // VALIDATION
      // =========================

      if (
        !patient ||

        typeof patient !==
          "object"
      ) {

        return res
          .status(400)
          .json({

            message:
              "Invalid patient data"
          });
      }

      if (
        !Array.isArray(
          patient.medications
        )
      ) {

        patient.medications = [];
      }

      if (
        !Array.isArray(
          patient.allergies
        )
      ) {

        patient.allergies = [];
      }

      if (
        typeof newDrug !==
          "string" ||

        newDrug.trim() ===
          ""
      ) {

        return res
          .status(400)
          .json({

            message:
              "Invalid drug name"
          });
      }

      // =========================
      // CALCULATIONS
      // =========================

      const egfr =
        calculateEGFR(
          patient
        );

      const score =
        calculateCHA2DS2VASc(
          patient
        );

      // =========================
      // SAFETY ENGINE
      // =========================

      const interactions =
        await safetyEngine
          .checkDrugInteractions(
            newDrug,
            patient.medications
          );

      const allergies =
        await safetyEngine
          .checkAllergyConflicts(
            newDrug,
            patient.allergies
          );

      const renal =
        await safetyEngine
          .checkRenalDosing(
            newDrug,
            egfr
          );

      // =========================
      // CONSTRAINT GENERATION
      // =========================

      const constraints =
        safetyEngine
          .generateConstraintText(
            interactions,
            allergies,
            renal
          );

      // =========================
      // GENERIC AI
      // =========================

      const genericAI =
        await generateGenericAI(
          patient,
          newDrug
        );

      // =========================
      // SAFETY-ENHANCED AI
      // =========================

      const enhancedAI =
        await generateEnhancedAI(
          patient,
          newDrug,
          constraints
        );

      // =========================
      // DEBUG LOGS
      // =========================

      console.log(
        "===================="
      );

      console.log(
        "PATIENT"
      );

      console.log(
        patient.name
      );

      console.log(
        "NEW DRUG"
      );

      console.log(
        newDrug
      );

      console.log(
        "INTERACTIONS"
      );

      console.log(
        interactions
      );

      console.log(
        "ALLERGIES"
      );

      console.log(
        allergies
      );

      console.log(
        "RENAL"
      );

      console.log(
        renal
      );

      console.log(
        "CONSTRAINTS"
      );

      console.log(
        constraints
      );

      console.log(
        "===================="
      );

      // =========================
      // RESPONSE
      // =========================

      res.json({

        patient:
          patient.name,

        newDrug,

        egfr,

        score,

        interactions,

        allergies,

        renal,

        constraints,

        genericAI,

        enhancedAI

      });

    } catch (error) {

      console.log(
        "SAFETY CHECK ERROR"
      );

      console.log(error);

      res.status(500).json({

        message:
          "Internal Server Error"
      });
    }
};

module.exports = {
  runSafetyCheck
};