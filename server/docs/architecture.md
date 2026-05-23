# Drug Safety Engine Architecture

## Overview

The Drug Safety Engine is a hybrid AI + deterministic clinical safety system designed to evaluate medication risks for patients.

The system combines:

- Deterministic safety rules
- Clinical pharmacology calculations
- AI-generated recommendations
- Supabase clinical datasets

---

# Frontend Architecture

client/src/

- components/
  - PatientCard.tsx
  - SafetyAlerts.tsx
  - ResponseComparison.tsx
  - DemoScenarioCard.tsx

- data/
  - patients.ts
  - demoScenarios.ts

- services/
  - api.ts

- pages/
  - Home.tsx

- App.tsx
- main.tsx

---

# Backend Architecture

server/

- controller/
  - safetyController.js

- services/
  - safetyEngine.js
  - llmService.js

- routes/
  - safetyRoutes.js

- utils/
  - calculateEGFR.js
  - calculateCHA2DS2VASc.js
  - supabase.js

- docs/
  - architecture.md

---

# Clinical Safety Pipeline

## Step 1

Frontend sends:

- selected patient
- proposed drug

to:

POST /api/safety/check

---

## Step 2

Controller calculates:

- eGFR
- CHA2DS2-VASc

---

## Step 3

Deterministic safety engine checks:

- drug interactions
- allergy conflicts
- renal dosing

using Supabase datasets.

---

## Step 4

Constraint text is generated.

Example:

- severe interactions
- contraindications
- monitoring advice

---

## Step 5

LLM layer generates:

- Generic AI response
- Safety-enhanced AI response

---

## Step 6

Frontend displays:

- deterministic findings
- AI comparison
- clinical recommendations

---

# Supabase Tables

## drug_interactions

Stores:

- drug pairs
- severity
- mechanism
- management recommendations

---

## allergy_cross_reactivity

Stores:

- allergy class
- cross-reactive drugs
- guidance

---

## drugs

Stores:

- drug metadata
- renal dosing thresholds
- recommendations

---

# Deterministic Engine

The deterministic engine acts as the primary safety layer.

This prevents hallucinations from the AI layer and ensures clinical safety constraints are always enforced.

---

# AI Layer

The AI layer provides:

- natural language explanations
- safer alternatives
- monitoring suggestions
- physician-friendly summaries

---

# Surprise Patient Readiness

The system supports dynamic patient objects and can evaluate unseen patients at runtime.

---

# Tech Stack

Frontend:
- React
- TypeScript
- TailwindCSS
- Axios

Backend:
- Node.js
- Express.js
- Supabase
- OpenRouter LLM API

Database:
- PostgreSQL (Supabase)

---

# Demo Features

- 10 preloaded patients
- 50 drugs
- 30 interaction pairs
- AI comparison mode
- Demo scenarios
- Renal dosing support
- Allergy conflict detection