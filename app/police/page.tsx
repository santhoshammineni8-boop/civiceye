"use client";

import { useState } from "react";

type PoliceResult = {
  incidentType: string;
  severity: string;
  threatScore: number;
  emergency: string;
  priority: string;
  station: string;
  patrolStatus: string;
  officerETA: string;
  confidence: number;
  ticketId: string;
  aiSummary: string;
};

export default function PolicePage() {
  const [incidentType, setIncidentType] = useState("Theft / Suspicious Activity");
  const [description, setDescription] = useState("");
  const [peopleInvolved, setPeopleInvolved] = useState(1);
  const [immediateDanger, setImmediateDanger] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<PoliceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pushLog = (msg: string, t: number) =>
    setTimeout(() => setLogs((p) => [...p, msg]), t);

  /* ---------------- SOS ---------------- */
  const triggerSOS = () => {
    setSosTriggered(true);
    setImmediateDanger(true);
    setIncidentType("Emergency SOS");
    setDescription("Citizen triggered SOS for immediate assistance.");
    reportIncident(true);
  };

  /* ---------------- MAIN AI ---------------- */
  const reportIncident = (isSOS = false) => {
    setLoading(true);
    setLogs([]);
    setResult(null);

    pushLog("Incident received by Police AI", 200);
    pushLog("Location and identity verified", 700);
    pushLog("AI analyzing threat context", 1200);
    pushLog("Checking area risk memory", 1700);
    pushLog("Evaluating patrol availability", 2200);

    setTimeout(() => {
      // Threat score logic
      let threatScore = 20;
      if (incidentType.includes("Assault") || incidentType.includes("Emergency"))
        threatScore += 40;
      if (immediateDanger) threatScore += 30;
      if (peopleInvolved > 2) threatScore += 10;
      if (isSOS) threatScore = 95;

      const emergency = threatScore >= 70 ? "Emergency" : "Non-Emergency";
      const priority = emergency === "Emergency" ? "HIGH" : "MEDIUM";
      const confidence = Math.min(0.7 + threatScore / 200, 0.95);

      setResult({
        incidentType,
        severity:
          threatScore >= 80 ? "Critical" : threatScore >= 50 ? "High" : "Moderate",
        threatScore,
        emergency,
        priority,
        station: "Banjara Hills Police Station (1.8 km)",
        patrolStatus:
          emergency === "Emergency"
            ? "Patrol dispatched immediately"
            : "Queued for officer review",
        officerETA: emergency === "Emergency" ? "6–8 minutes" : "25–40 minutes",
        confidence: Math.round(confidence * 100),
        ticketId: "POL-" + Math.floor(10000 + Math.random() * 90000),
        aiSummary: `
AI Summary:
Citizen reported ${incidentType}.
Immediate danger: ${immediateDanger ? "Yes" : "No"}.
People involved: ${peopleInvolved}.
Threat score ${threatScore}/100 triggered ${priority} priority.
Nearest station assigned with patrol availability confirmed.
        `,
      });

      setLoading(false);

      pushLog("Incident routed to nearest police station", 2700);
      pushLog("Patrol unit notified and dispatched", 3200);
      pushLog("AI monitoring response timeline", 3700);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl text-gray-900 font-bold mb-1">Police Emergency Assistance</h1>
          <p className="text-gray-900 mb-4">
            AI-assisted incident analysis, routing, and response
          </p>

          {/* SOS BUTTON */}
          <button
            onClick={triggerSOS}
            className="w-full mb-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold"
          >
            🚨 SOS — IMMEDIATE HELP
          </button>

          {/* INCIDENT FORM */}
          <div className="bg-white p-4 text-gray-900 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-3">Report an Incident</h2>

            <label className="text-sm text-gray-900 block mb-1">Incident type</label>
            <select
              className="border rounded p-2 w-full mb-3"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
            >
              <option>Theft / Suspicious Activity</option>
              <option>Assault / Violence</option>
              <option>Harassment</option>
              <option>Missing Person</option>
              <option>Other Emergency</option>
            </select>

            <label className="text-sm text-gray-900 block mb-1">Description</label>
            <textarea
              className="border rounded p-2 w-full mb-3"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm text-gray-900 block mb-1">People involved</label>
                <input
                  type="number"
                  min={1}
                  className="border rounded p-2 w-full"
                  value={peopleInvolved}
                  onChange={(e) => setPeopleInvolved(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Immediate danger?</label>
                <input
                  type="checkbox"
                  checked={immediateDanger}
                  onChange={(e) => setImmediateDanger(e.target.checked)}
                />{" "}
                Yes
              </div>
            </div>

            <button
              onClick={() => reportIncident()}
              className="w-full bg-black text-white py-2 rounded"
            >
              Submit Police Complaint
            </button>
          </div>

          {/* AI RESPONSE */}
          {loading && (
            <div className="bg-white p-4 text-gray-900 rounded-xl shadow mb-6">
             AI assessing threat, prioritizing, and dispatching response…
            </div>
          )}

          {result && (
            <div className="bg-white p-4  text-gray-900 rounded-xl shadow mb-6">
              <h2 className="font-semibold mb-3">AI Police Response</h2>

              <ul className="text-sm space-y-1">
                <li>Incident: {result.incidentType}</li>
                <li>Severity: {result.severity}</li>
                <li>Threat Score: {result.threatScore}/100</li>
                <li>Priority: {result.priority}</li>
                <li>Emergency: {result.emergency}</li>
                <li>Assigned Station: {result.station}</li>
                <li>Patrol Status: {result.patrolStatus}</li>
                <li>Officer ETA: {result.officerETA}</li>
                <li>AI Confidence: {result.confidence}%</li>
                <li>Incident ID: {result.ticketId}</li>
              </ul>

              <pre className="mt-3 text-xs text-gray-900 bg-gray-50 p-2 rounded">
                {result.aiSummary}
              </pre>

              <p className="text-xs text-gray-500text-gray-900 mt-2">
                AI Fairness Check: No personal or demographic data used.
                Human officers retain full control.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT — AI MONITOR */}
        <div className="bg-white text-gray-900 p-4 rounded-xl shadow h-fit sticky top-6">
          <h2 className="font-semibold mb-3">AI Activity Monitor</h2>

          {logs.length === 0 ? (
            <p className="text-sm text-gray-900">
              Awaiting police interaction…
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
               SOS MODE ACTIVE — Highest priority enforced
            </p>
          )}

          {result && (
            <div className="mt-4 text-xs text-gray-900 border-t pt-3">
              <p>AI Roles: Threat analysis, prioritization, routing</p>
              <p>Learning: Feedback & response outcomes</p>
              <p>Oversight: Human-in-the-loop enforcement</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
