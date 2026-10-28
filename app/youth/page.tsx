"use client";

import { useEffect, useState } from "react";

export default function YouthPage() {
  /* ---------- HOOKS ---------- */
  const [mounted, setMounted] = useState(false);
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /* ---------- AI FLOW ---------- */
  const analyze = () => {
    setResult(null);
    setLogs([]);
    setError(null);

    const trimmedIdea = idea.trim();

    //  NO INPUT
    if (trimmedIdea.length === 0) {
      setError("Please describe your idea before analysis.");
      setLogs([
        "AI halted analysis: No idea provided by citizen",
        "Awaiting meaningful input to assess feasibility",
      ]);
      return;
    }

    // ⚠️ TOO SHORT
    if (trimmedIdea.length < 10) {
      setError(
        "Idea is too brief. Please add more details to get realistic guidance."
      );
      setLogs([
        "AI detected insufficient detail in idea",
        "Minimum context required for feasibility analysis",
      ]);
      return;
    }

    // ✅ VALID INPUT → RUN AI
    setLoading(true);

    const log = (msg: string, t: number) =>
      setTimeout(() => setLogs((p) => [...p, msg]), t);

    log("Idea received from citizen", 300);
    log("Analyzing feasibility and execution complexity", 900);
    log("Estimating cost, timeline, and risks", 1500);
    log("Mapping realistic funding paths", 2100);

    setTimeout(() => {
      setResult({
        feasibility: "Medium",
        executionDifficulty: "Moderate",
        estimatedCost: "₹5–8 lakhs",
        successChance: "58%",
        commonFailureReason:
          "Most ideas fail due to underestimating execution effort and regulatory compliance.",
        nextSteps: [
          "Create a small pilot or prototype",
          "Validate with 20–30 real users",
          "Apply for a municipal or state pilot grant",
        ],
      });

      setLoading(false);
      log("AI guidance delivered to citizen", 2600);
    }, 3000);
  };

  /* ---------- UI ---------- */
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-gray-900 font-bold mb-1">Youth Opportunities</h1>
      <p className="text-gray-600 mb-4">
        Realistic guidance for ideas, funding, and execution
      </p>

      <textarea
        className="border text-gray-900 rounded p-2 w-full mb-2"
        placeholder="Describe your idea clearly (problem, solution, who it helps)"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      {error && (
        <p className="text-red-600 text-sm mb-3">
          ⚠️ {error}
        </p>
      )}

      <button
        onClick={analyze}
        className="bg-black text-white  px-4 py-2 rounded mb-6"
        disabled={loading}
      >
        Analyze My Idea
      </button>

      {loading && (
        <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
          AI evaluating idea feasibility…
        </div>
      )}

      {result && (
        <div className="bg-white text-gray-900 p-4 rounded shadow mb-4">
          <p>Feasibility: {result.feasibility}</p>
          <p>Execution Difficulty: {result.executionDifficulty}</p>
          <p>Estimated Cost: {result.estimatedCost}</p>
          <p>Success Chance: {result.successChance}</p>

          <p className="mt-2 text-gray-900 text-sm">
            <b>Why similar ideas fail:</b> {result.commonFailureReason}
          </p>

          <p className="mt-3 text-gray-900 font-semibold">Recommended next steps:</p>
          <ul className="list-disc ml-6">
            {result.nextSteps.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white text-gray-900 p-4 rounded shadow mt-6">
        <h2 className="font-semibold mb-2">AI Activity Monitor</h2>
        <ul className="text-sm space-y-1">
          {logs.map((l, i) => (
            <li key={i}>• {l}</li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Guidance simulated for prototype demonstration.
      </p>
    </main>
  );
}
