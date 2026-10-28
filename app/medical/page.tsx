"use client";

import { useState } from "react";
import { useCivicAI } from "../components/CivicAIContext";
type MedicalResult = {
  condition: string;
  severity: string;
  triageScore: number;
  riskLevel: string;
  action: string;
  hospital: string;
  eta: string;
  confidence: number;
  caseId: string;
  aiSummary: string;
};

export default function MedicalPage() {
  const [condition, setCondition] = useState("Injury / Accident");
  const [symptoms, setSymptoms] = useState("");
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [conscious, setConscious] = useState(true);
  const [breathingIssue, setBreathingIssue] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<MedicalResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pushLog = (msg: string, t: number) =>
    setTimeout(() => setLogs((p) => [...p, msg]), t);

  /* ---------------- SOS ---------------- */
  const triggerSOS = () => {
    setSosTriggered(true);
    setCondition("Medical SOS");
    setSymptoms("Citizen triggered SOS for immediate medical help.");
    setConscious(false);
    setBreathingIssue(true);
    requestHelp(true);
  };

  /* ---------------- AI CORE ---------------- */
  const requestHelp = (isSOS = false) => {
    setLoading(true);
    setLogs([]);
    setResult(null);

    pushLog("Medical request received", 300);
    pushLog("AI triage engine analyzing symptoms", 900);
    pushLog("Vital risk indicators evaluated", 1500);
    pushLog("Severity classification in progress", 2100);
    pushLog("Nearest hospital & ambulance availability checked", 2700);

    setTimeout(() => {
      let triageScore = 20;
      if (condition.includes("Chest") || condition.includes("SOS")) triageScore += 40;
      if (!conscious) triageScore += 30;
      if (breathingIssue) triageScore += 30;
      if (ageGroup === "Child" || ageGroup === "Elderly") triageScore += 10;
      if (isSOS) triageScore = 95;

      const riskLevel =
        triageScore >= 85
          ? "Critical"
          : triageScore >= 60
          ? "High"
          : triageScore >= 40
          ? "Moderate"
          : "Low";

      const action =
        triageScore >= 70
          ? "Ambulance dispatched immediately"
          : "Proceed to nearest hospital within recommended time";

      const eta = triageScore >= 70 ? "6–10 minutes" : "Within 2 hours";

      const confidence = Math.min(0.75 + triageScore / 200, 0.95);

      setResult({
        condition,
        severity: riskLevel,
        triageScore,
        riskLevel,
        action,
        hospital: "Apollo Hospital – Jubilee Hills (2.1 km)",
        eta,
        confidence: Math.round(confidence * 100),
        caseId: "MED-" + Math.floor(10000 + Math.random() * 90000),
        aiSummary: `
AI Triage Summary:
Condition reported: ${condition}
Conscious: ${conscious ? "Yes" : "No"}
Breathing difficulty: ${breathingIssue ? "Yes" : "No"}
Age group: ${ageGroup}
Triage score ${triageScore}/100 → ${riskLevel} risk.
Recommended action: ${action}.
Human medical staff notified for oversight.
        `,
      });

      setLoading(false);

      pushLog("Medical response initiated", 3300);
      pushLog("Hospital alerted and case registered", 3900);
      pushLog("AI monitoring patient response timeline", 4500);
    }, 3000);
  };

  return (
    <main className="min-h-screen text-gray-900 bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-1">Medical Emergency Assistance</h1>
          <p className="text-gray-600 mb-4">
            AI-powered medical triage and emergency coordination
          </p>

          {/* SOS */}
          <button
            onClick={triggerSOS}
            className="w-full mb-6 bg-red-500 text-white py-3 rounded-xl text-lg font-semibold"
          >
            🚑 SOS — IMMEDIATE MEDICAL HELP
          </button>

          {/* MEDICAL INPUT */}
          <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
            <h2 className="font-semibold mb-3">Request Medical Assistance</h2>

            <label className="text-sm block mb-1">Condition</label>
            <select
              className="border rounded p-2 w-full mb-3"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option>Injury / Accident</option>
              <option>High Fever</option>
              <option>Chest Pain</option>
              <option>Breathing Difficulty</option>
              <option>Unconscious</option>
              <option>Other Medical Issue</option>
            </select>

            <label className="text-sm block mb-1">Symptoms / Notes</label>
            <textarea
              className="border rounded p-2 w-full mb-3"
              placeholder="Optional description"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm block mb-1">Age group</label>
                <select
                  className="border rounded p-2 w-full"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                >
                  <option>Child</option>
                  <option>Adult</option>
                  <option>Elderly</option>
                </select>
              </div>

              <div>
                <label className="text-sm block mb-1">Conscious?</label>
                <input
                  type="checkbox"
                  checked={conscious}
                  onChange={(e) => setConscious(e.target.checked)}
                />{" "}
                Yes
              </div>
            </div>

            <label className="text-sm mb-3 block">
              <input
                type="checkbox"
                checked={breathingIssue}
                onChange={(e) => setBreathingIssue(e.target.checked)}
              />{" "}
              Breathing difficulty
            </label>

            <button
              onClick={() => requestHelp()}
              className="w-full bg-black text-white py-2 rounded"
            >
              Submit Medical Request
            </button>
          </div>

          {/* AI THINKING */}
          {loading && (
            <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
              AI performing medical triage and risk assessment…
            </div>
          )}

          {/* AI RESPONSE */}
          {result && (
            <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
              <h2 className="font-semibold mb-3">AI Medical Response</h2>

              <ul className="text-sm space-y-1">
                <li>Condition: {result.condition}</li>
                <li>Risk Level: {result.riskLevel}</li>
                <li>Triage Score: {result.triageScore}/100</li>
                <li>Recommended Action: {result.action}</li>
                <li>Assigned Hospital: {result.hospital}</li>
                <li>Estimated Response Time: {result.eta}</li>
                <li>AI Confidence: {result.confidence}%</li>
                <li>Case ID: {result.caseId}</li>
              </ul>

              <pre className="mt-3 text-xs text-gray-900  bg-gray-50 p-2 rounded">
                {result.aiSummary}
              </pre>

              <p className="text-xs text-gray-500 mt-2">
                ⚕️ AI assists triage only. Diagnosis and treatment remain under
                licensed medical professionals.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT — AI MONITOR */}
        <div className="bg-white  text-gray-900 p-4 rounded shadow h-fit sticky top-6">
          <h2 className="font-semibold mb-3">AI Activity Monitor</h2>

          {logs.length === 0 ? (
            <p className="text-sm text-gray-500">
              Awaiting medical request…
            </p>
          ) : (
            <ul className="text-sm space-y-2">
              {logs.map((l, i) => (
                <li key={i}>• {l}</li>
              ))}
            </ul>
          )}

          {sosTriggered && (
            <p className="mt-4 text-xs text-red-600 font-semibold">
              SOS MODE ACTIVE — Critical priority enforced
            </p>
          )}

          {result && (
            <div className="mt-4 text-xs text-gray-500 border-t pt-3">
              <p>AI Roles: Triage, prioritization, routing</p>
              <p>Learning: Outcome & response feedback</p>
              <p>Oversight: Doctors & paramedics</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        AI-powered medical prototype. All logic simulated for demonstration.
      </p>
    </main>
  );
}
