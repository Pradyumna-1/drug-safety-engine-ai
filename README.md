# AI Drug Safety Engine

AI-powered clinical decision support system for detecting:

- Drug interactions
- Allergy conflicts
- Renal dosing risks
- High-risk medication combinations

The platform combines:

- Deterministic safety engine
- AI-generated clinical recommendations
- Supabase clinical datasets
- React frontend
- OpenRouter LLM integration

---

# Features

## Deterministic Safety Engine

The deterministic engine performs:

- Drug-drug interaction detection
- Allergy cross-reactivity checks
- Renal dosing validation
- eGFR calculation
- CHA₂DS₂-VASc scoring

This layer acts as the primary clinical safety system.

---

## AI Clinical Recommendation Layer

The AI layer generates:

- Risk summaries
- Safer alternatives
- Monitoring recommendations
- Clinical guidance

The project includes:

### Generic AI
AI response without safety constraints.

### Safety-Enhanced AI
AI response with deterministic clinical constraints injected into the prompt.

This demonstrates how deterministic safety systems improve AI reliability.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js

## Database

- Supabase PostgreSQL

## AI

- OpenRouter API
- GPT-3.5 Turbo

---

# Project Structure

## Frontend

```txt
client/src/
├── components/
│   ├── PatientCard.tsx
│   ├── SafetyAlerts.tsx
│   ├── ResponseComparison.tsx
│   └── DemoScenarioCard.tsx
├── data/
│   ├── patients.ts
│   └── demoScenarios.ts
├── pages/
│   └── Home.tsx
├── services/
│   └── api.ts
├── App.tsx
└── main.tsx
```

## Backend

```txt

server/
├── controller/
│   └── safetyController.js
├── services/
│   ├── safetyEngine.js
│   └── llmService.js
├── routes/
│   └── safetyRoutes.js
├── utils/
│   ├── calculateEGFR.js
│   ├── calculateCHA2DS2VASc.js
│   └── supabase.js
├── docs/
│   └── architecture.md
├── .env.example
├── README.md
└── index.js

```

Clinical Safety Pipeline
Step 1

Frontend sends:

patient data
proposed medication

to:
POST /api/safety/check

Step 2

Backend calculates:

eGFR
CHA₂DS₂-VASc
Step 3

Deterministic safety engine evaluates:

drug interactions
allergy conflicts
renal dosing

using Supabase datasets.

Step 4

Constraint text is generated.

Example:

contraindications
severe interactions
monitoring instructions
Step 5

AI layer generates:

Generic AI response
Safety-enhanced AI response
Step 6

Frontend displays:

deterministic findings
AI comparison
clinical recommendations
Setup Instructions
1. Clone Repository
Step 2

Backend calculates:

eGFR
CHA₂DS₂-VASc
Step 3

Deterministic safety engine evaluates:

drug interactions
allergy conflicts
renal dosing

using Supabase datasets.

Step 4

Constraint text is generated.

Example:

contraindications
severe interactions
monitoring instructions
Step 5

AI layer generates:

Generic AI response
Safety-enhanced AI response
Step 6

Frontend displays:

deterministic findings
AI comparison
clinical recommendations
Setup Instructions
1. Clone Repository
git clone <repository-url>

## Backend Setup

cd server
npm install
nodemon index.js

Backend runs on:

http://localhost:5000


## Frontend Setup
cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Environment Variables

Create:

server/.env

Add:
PORT=5000

SUPABASE_URL=

SUPABASE_KEY=

OPENROUTER_API_KEY=


Supabase Tables

Required tables:

drug_interactions

Stores:

interacting drug pairs
severity
mechanism
management recommendations
allergy_cross_reactivity

Stores:

allergy class
cross-reactive medications
guidance
drugs

Stores:

drug metadata
renal dosing thresholds
renal recommendations
Demo Features

The project includes:

10 preloaded patients
50 drugs
30 interaction pairs
4 official demo scenarios
Generic vs enhanced AI comparison
Surprise patient support
Demo Scenarios

Included scenarios:

Statin + Macrolide interaction
Anticoagulant bleeding risk
Renal dosing warning
Allergy conflict detection


# API Endpoint
## POST
/api/safety/check


Request Example
{
  "patient": {},
  "newDrug": "Clarithromycin"
}
Safety Philosophy

The deterministic engine acts as the source of truth.

AI is used only for:

explanation
summarization
recommendation enhancement

This reduces hallucination risk and improves clinical safety.

Author

Pradyumna Kumar Naik
