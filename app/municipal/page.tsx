"use client";

import { useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";

type MunicipalResult = {
  issueType: string;
  impactLevel: string;
  impactScore: number;
  priority: string;
  department: string;
  ward: string;
  office: string;
  maxDays: number;
  escalationRule: string;
  ticketId: string;
  aiConfidence: number;
  aiSummary: string;
};

export default function MunicipalPage() {
  const [issueType, setIssueType] = useState("Garbage Accumulation");
  const [description, setDescription] = useState("");
  const [publicRisk, setPublicRisk] = useState(false);
  const [repeatIssue, setRepeatIssue] = useState(false);

  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<MunicipalResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  /* ---------------- AI LOG HELPER ---------------- */
  const pushLog = (msg: string, t: number) =>
    setTimeout(() => setLogs((p) => [...p, msg]), t);

  /* ---------------- AI CORE ---------------- */
  const submitIssue = () => {
    setLoading(true);
    setLogs([]);
    setResult(null);
    setFeedback(null);

    pushLog("Municipal complaint received from citizen", 300);
    pushLog("Location & ward jurisdiction verified", 800);
    pushLog("AI analyzing civic impact and public risk", 1400);
    pushLog("Department responsibility identified", 2000);
    pushLog("Service-level timelines enforced", 2600);
    pushLog("AI monitoring and escalation rules activated", 3200);

    setTimeout(() => {
      // Impact scoring
      let impactScore = 30;
      if (issueType === "Pothole") impactScore += 30;
      if (issueType === "Waterlogging") impactScore += 40;
      if (publicRisk) impactScore += 20;
      if (repeatIssue) impactScore += 10;

      const impactLevel =
        impactScore >= 80 ? "Critical" :
        impactScore >= 60 ? "High" :
        impactScore >= 40 ? "Medium" : "Low";

      const rules: Record<
        string,
        { dept: string; days: number }
      > = {
        "Garbage Accumulation": {
          dept: "Municipal Sanitation Department",
          days: 3,
        },
        Pothole: {
          dept: "Roads & Infrastructure Department",
          days: 7,
        },
        Waterlogging: {
          dept: "Stormwater & Drainage Department",
          days: 2,
        },
        "Any other": {
          dept: "Municipal Grievance Cell",
          days: 5,
        },
      };

      const priority = impactScore >= 70 ? "HIGH" : "MEDIUM";
      const aiConfidence = Math.min(85 + impactScore / 10, 95);

      setResult({
        issueType,
        impactLevel,
        impactScore,
        priority,
        department: rules[issueType].dept,
        ward: "Ward 23",
        office: "Ward 23 Municipal Office",
        maxDays: rules[issueType].days,
        escalationRule: "Auto-escalate to Zonal Officer if unresolved",
        ticketId: "MUN-" + Math.floor(10000 + Math.random() * 90000),
        aiConfidence: Math.round(aiConfidence),
        aiSummary: `
AI Summary:
Issue reported: ${issueType}
Public risk flagged: ${publicRisk ? "Yes" : "No"}
Repeat occurrence: ${repeatIssue ? "Yes" : "No"}
Impact score ${impactScore}/100 → ${impactLevel} impact.
Assigned ${rules[issueType].dept} with ${rules[issueType].days}-day SLA.
Escalation will occur automatically if deadline is missed.
        `,
      });

      setLoading(false);

      pushLog("Municipal office notified and work order created", 3800);
      pushLog("AI monitoring service completion timeline", 4400);
    }, 3600);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — MAIN FLOW */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl text-gray-900 font-bold mb-1">Municipal City Health</h1>
          <p className="text-gray-900 mb-4">
            AI-driven civic accountability and service enforcement
          </p>

          {/* ISSUE INPUT */}
          <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
            <h2 className="font-semibold mb-3">Report a Civic Issue</h2>

            <label className="text-sm block text-gray-900 mb-1">Issue type</label>
            <select
              className="border rounded text-gray-700 p-2 w-full mb-3"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option>Garbage Accumulation</option>
              <option>Pothole</option>
              <option>Waterlogging</option>
              <option>Any other</option>
            </select>

            <label className="text-sm  text-gray-900 block mb-1">Description</label>
            <textarea
              className="border rounded p-2 w-full mb-3"
              placeholder="Brief description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="text-sm">
                <input
                  type="checkbox"
                  checked={publicRisk}
                  onChange={(e) => setPublicRisk(e.target.checked)}
                />{" "}
                Public safety risk present
              </label>

              <label className="text-sm">
                <input
                  type="checkbox"
                  checked={repeatIssue}
                  onChange={(e) => setRepeatIssue(e.target.checked)}
                />{" "}
                Repeated issue at this location
              </label>
            </div>

            <ImageUpload onAnalyze={submitIssue} />
            
          </div>

          {/* AI THINKING */}
          {loading && (
            <div className="bg-white p-4 text-gray-900 rounded shadow mb-6">
               AI validating issue, assessing impact, and enforcing timelines…
            </div>
          )}

          {/* AI RESULT */}
          {result && (
            <div className="bg-white p-4 text-gray-900 rounded shadow mb-6">
              <h2 className="font-semibold mb-3">AI Municipal Response</h2>

              <ul className="text-sm space-y-1">
                <li>Issue: {result.issueType}</li>
                <li>Impact Level: {result.impactLevel}</li>
                <li>Impact Score: {result.impactScore}/100</li>
                <li>Priority: {result.priority}</li>
                <li>Department: {result.department}</li>
                <li>Ward: {result.ward}</li>
                <li>Office: {result.office}</li>
                <li>SLA: {result.maxDays} days</li>
                <li>Escalation: {result.escalationRule}</li>
                <li>AI Confidence: {result.aiConfidence}%</li>
                <li>Ticket ID: {result.ticketId}</li>
              </ul>

              <pre className="mt-3 text-xs text-gray-900 bg-gray-50 p-2 rounded">
                {result.aiSummary}
              </pre>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => setFeedback("Helpful")}
                  className="border px-3 py-1"
                >
                  Helpful
                </button>
                <button
                  onClick={() => setFeedback("Not Helpful")}
                  className="border px-3 py-1"
                >
                  Not Helpful
                </button>
              </div>

              {feedback && (
                <p className="text-xs text-gray-900 mt-2">
                  Feedback recorded. AI will refine prioritization rules.
                </p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — AI ACTIVITY / JUDGE PANEL */}
        <div className="bg-white text-gray-900 p-4 rounded shadow h-fit sticky top-6">
          <h2 className="font-semibold mb-3">
           AI Activity Monitor (Judge View)
          </h2>

          {logs.length === 0 ? (
            <p className="text-sm text-gray-900">
              Awaiting municipal complaint…
            </p>
          ) : (
            <ul className="text-sm space-y-2">
              {logs.map((l, i) => (
                <li key={i}>• {l}</li>
              ))}
            </ul>
          )}

          {result && (
            <div className="mt-4 text-xs text-gray-900 border-t pt-3">
              <p>AI Roles: Impact analysis, prioritization, routing</p>
              <p>Learning: Feedback + repeat-issue patterns</p>
              <p>Oversight: Human execution by municipal staff</p>
            </div>
            
          )}
        </div>
      </div>

      <p className="text-xs text-gray-900 mt-8">
        AI-powered municipal prototype. All logic simulated for demonstration.
      </p>
    </main>
  );
}
