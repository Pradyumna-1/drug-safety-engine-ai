// const axios =
//   require("axios");

// async function generateAISummary(
//   patient,
//   newDrug,
//   constraints
// ) {

//   try {

//     const prompt = `

// You are a clinical pharmacology assistant.

// PATIENT:
// ${JSON.stringify(patient, null, 2)}

// NEW DRUG:
// ${newDrug}

// DETERMINISTIC FINDINGS:
// ${constraints}

// Provide:
// 1. Risk summary
// 2. Safer alternatives
// 3. Monitoring recommendations

// `;

//     const response =
//       await axios.post(

//         "https://openrouter.ai/api/v1/chat/completions",

//         {
//           model:
//             "openai/gpt-3.5-turbo",

//           messages: [

//             {
//               role: "system",

//               content:
//                 "You are an expert clinical pharmacology assistant."
//             },

//             {
//               role: "user",

//               content: prompt
//             }
//           ]
//         },

//         {
//           headers: {

//             Authorization:
//               `Bearer ${process.env.OPENROUTER_API_KEY}`,

//             "Content-Type":
//               "application/json",

//             "HTTP-Referer":
//               "http://localhost:5173",

//             "X-Title":
//               "Drug Safety Engine"
//           }
//         }
//       );

//     console.log("AI RESPONSE");
//     console.log(
//       response.data
//     );

//     return response
//       .data
//       .choices[0]
//       .message
//       .content;

//   } catch (error) {

//     console.log(
//       "LLM ERROR"
//     );

//     console.log(
//       error.response?.data ||
//       error.message
//     );

//     return `

// AI recommendation unavailable.

// Deterministic engine findings should be used for current clinical review.

// `;
//   }
// }

// module.exports = {
//   generateAISummary
// };





const axios =
  require("axios");

async function generateGenericAI(
  patient,
  newDrug
) {

  try {

    const prompt = `

Patient:
${JSON.stringify(patient, null, 2)}

New Drug:
${newDrug}

Give medication advice.

`;

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {
          model:
            "openai/gpt-3.5-turbo",

          messages: [

            {
              role: "user",
              content: prompt
            }
          ]
        },

        {
          headers: {

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json"
          }
        }
      );

    return response
      .data
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(error);

    return "Generic AI unavailable.";
  }
}

async function generateEnhancedAI(
  patient,
  newDrug,
  constraints
) {

  try {

    const prompt = `

You are a clinical pharmacology assistant.

Patient:
${JSON.stringify(patient, null, 2)}

New Drug:
${newDrug}

Safety Constraints:
${constraints}

Provide:
1. Clinical risks
2. Safer alternatives
3. Monitoring recommendations

`;

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {
          model:
            "openai/gpt-3.5-turbo",

          messages: [

            {
              role: "system",

              content:
                "You are an expert clinical pharmacology assistant."
            },

            {
              role: "user",

              content: prompt
            }
          ]
        },

        {
          headers: {

            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json"
          }
        }
      );

    return response
      .data
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(error);

    return "Enhanced AI unavailable.";
  }
}

module.exports = {
  generateGenericAI,
  generateEnhancedAI
};