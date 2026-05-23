import { useState } from "react";

import api from "../services/api";

import { patients }
from "../data/patients";

import { demoScenarios }
from "../data/demoScenarios";

import PatientCard
from "../components/PatientCard";

import SafetyAlerts
from "../components/SafetyAlerts";

import ResponseComparison
from "../components/ResponseComparison";

import DemoScenarioCard
from "../components/DemoScenarioCard";

function Home() {

  const [
    selectedPatient,

    setSelectedPatient

  ] = useState(
    patients[0]
  );

  const [
    drug,

    setDrug

  ] = useState("");

  const [
    result,

    setResult

  ] = useState<any>(null);

  const [
    loading,

    setLoading

  ] = useState(false);

  async function runSafetyCheck(
    patientData = selectedPatient,
    drugName = drug
  ) {

    try {

      setLoading(true);

      const response =
        await api.post(
          "/safety/check",
          {
            patient:
              patientData,

            newDrug:
              drugName
          }
        );

      setResult(
        response.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="
      min-h-screen
      bg-slate-100
      p-8
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-8
        ">

          AI Drug Safety Engine

        </h1>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          mb-8
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-4
          ">

            <select
              className="
                border
                border-gray-300
                rounded-lg
                p-3
              "
              onChange={(e) => {

                const patient =
                  patients.find(
                    p =>
                      p.id ===
                      Number(
                        e.target.value
                      )
                  );

                setSelectedPatient(
                  patient!
                );
              }}
            >

              {
                patients.map(
                  patient => (

                    <option
                      key={
                        patient.id
                      }
                      value={
                        patient.id
                      }
                    >

                      {patient.name}

                    </option>
                  )
                )
              }

            </select>

            <input
              type="text"
              value={drug}
              onChange={(e) =>
                setDrug(
                  e.target.value
                )
              }
              placeholder="
                Enter new medication
              "
              className="
                flex-1
                border
                border-gray-300
                rounded-lg
                p-3
              "
            />

            <button
              onClick={() =>
                runSafetyCheck()
              }

              disabled={loading}

              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
                disabled:opacity-50
              "
            >

              {
                loading
                  ? "Checking..."
                  : "Run Safety Check"
              }

            </button>

          </div>

        </div>

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mb-8
        ">

          <PatientCard
            patient={
              selectedPatient
            }
          />

          <SafetyAlerts
            result={result}
          />

        </div>

        {
          result && (

            <ResponseComparison

              generic={
                result.genericAI
              }

              enhanced={
                result.enhancedAI
              }
            />
          )
        }

        <div className="
          mt-10
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-6
          ">

            Official Demo Scenarios

          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">

            {
              demoScenarios.map(
                (
                  scenario,
                  index
                ) => {

                  const patient =
                    patients.find(
                      p =>
                        p.id ===
                        scenario.patientId
                    );

                  return (

                    <DemoScenarioCard
                      key={index}
                      title={
                        scenario.title
                      }
                      drug={
                        scenario.drug
                      }
                      onRun={() => {

                        setSelectedPatient(
                          patient!
                        );

                        setDrug(
                          scenario.drug
                        );

                        runSafetyCheck(
                          patient,
                          scenario.drug
                        );
                      }}
                    />
                  );
                }
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;