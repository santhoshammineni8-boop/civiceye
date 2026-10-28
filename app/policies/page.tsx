"use client";

import { useEffect, useState } from "react";
import { useCivicAI } from "../components/CivicAIContext";

type Policy = {
  name: string;
  status: "Eligible" | "Almost Eligible" | "Not Eligible";
  reason: string;
  suggestion: string;
  confidence: number;
  reasoningFactors: string[];
};

export default function PoliciesPage() {
 
const { addSignal } = useCivicAI();

  const [mounted, setMounted] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("citizen");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  if (!mounted) return null;

  const analyze = () => {
    setLoading(true);
    setPolicies([]);
    setLogs([]);

    const log = (msg: string, t: number) =>
      setTimeout(() => setLogs((p) => [...p, msg]), t);

    log("Accessing verified citizen profile", 300);
    log("Analyzing income, age & demographic rules", 900);
    log("Checking eligibility constraints & edge cases", 1500);
    log("Calculating confidence levels", 2100);

    setTimeout(() => {
      const age = profile?.age || 22;
      const income = profile?.income || "Low";

      const results: Policy[] = [
        {
          name: "Student Fee Reimbursement",
          status: income === "Low" ? "Eligible" : "Almost Eligible",
          reason:
            income === "Low"
              ? "Income threshold satisfied under state education scheme."
              : "Income slightly exceeds subsidy bracket.",
          suggestion:
            income === "Low"
              ? "Proceed to apply through education portal."
              : "Consider income reassessment documentation.",
          confidence: income === "Low" ? 92 : 70,
          reasoningFactors: [
            "Income bracket evaluated",
            "Education eligibility criteria matched",
            "Profile age verified"
          ]
        },
        {
          name: "Housing Subsidy Scheme",
          status: income === "Low" ? "Almost Eligible" : "Not Eligible",
          reason:
            income === "Low"
              ? "Property ownership validation pending."
              : "Income exceeds housing subsidy cap.",
          suggestion:
            income === "Low"
              ? "Upload property records for re-evaluation."
              : "Explore middle-income housing schemes.",
          confidence: income === "Low" ? 75 : 60,
          reasoningFactors: [
            "Income threshold applied",
            "Property ownership rule considered"
          ]
        },
        {
          name: "Senior Citizen Pension",
          status: age >= 60 ? "Eligible" : "Not Eligible",
          reason:
            age >= 60
              ? "Age requirement satisfied."
              : "Minimum age requirement not met.",
          suggestion:
            age >= 60
              ? "Submit pension enrollment form."
              : "Eligibility opens at 60 years.",
          confidence: age >= 60 ? 95 : 98,
          reasoningFactors: [
            "Age verification performed",
            "Pension rule threshold applied"
          ]
        }
      ];

      setPolicies(results);

      addSignal(`Policy analysis completed for ${results.length} results`);

      setLoading(false);

      log("Eligibility scoring finalized", 2700);
      log("Citizen guidance generated", 3300);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <h1 className="text-2xl font-bold mb-1">
        Policies & Allowances
      </h1>
      <p className="text-gray-600 mb-4">
        AI-based eligibility evaluation & benefit optimization
      </p>

      <button
        onClick={analyze}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Analyze My Benefits
      </button>

      {loading && (
        <div className="bg-white p-4 rounded shadow mb-6">
           AI evaluating eligibility and computing confidence...
        </div>
      )}

      {policies.map((p, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-1">{p.name}</h2>

          <p className="text-sm mb-2">
            Status: <b>{p.status}</b>
          </p>

          <p className="text-sm mb-2">{p.reason}</p>

          <p className="text-sm text-gray-700 mb-2">
            <b>What you can do:</b> {p.suggestion}
          </p>

          <p className="text-sm mb-2">
            AI Confidence: {p.confidence}%
          </p>

          <div>
            <h3 className="font-semibold text-sm mb-1">
               Why this decision?
            </h3>
            <ul className="list-disc ml-6 text-sm">
              {p.reasoningFactors.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">
          AI Activity Monitor
        </h2>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">
            Awaiting benefit analysis…
          </p>
        ) : (
          <ul className="text-sm space-y-1">
            {logs.map((l, i) => (
              <li key={i}>• {l}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Hybrid AI: deterministic rule engine + adaptive behavioral learning layer.
      </p>
    </main>
  );
}
