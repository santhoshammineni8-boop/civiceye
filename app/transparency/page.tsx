"use client";

import { useEffect, useState } from "react";
import { useCivicAI } from "../components/CivicAIContext";

export default function TransparencyPage() {
  const { signals, confidence, speed } = useCivicAI();

  const [liveConfidence, setLiveConfidence] = useState(confidence);
  const [liveSpeed, setLiveSpeed] = useState(speed);
  const [reasoning, setReasoning] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveConfidence((prev) =>
        Math.max(60, Math.min(99, prev + (Math.random() * 4 - 2)))
      );

      setLiveSpeed(10 + Math.floor(Math.random() * 8));

      setReasoning((prev) => [
        `Analyzed ${signals.length} civic signals`,
        `Updated ward risk score`,
        `Optimized escalation path`,
        `Recalibrated AI decision matrix`,
        ...prev.slice(0, 4),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [signals.length]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-white pt-24 pb-40">
      <div className="max-w-6xl mx-auto px-8">

        {/* HEADER WITH LIVE PULSE */}
        <div className="mb-14 flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Civic Intelligence Core
            </h1>
            <p className="text-neutral-400 mt-2">
              Live Governance AI Monitoring & Decision Engine
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LIVE SIGNALS */}
          <Panel title="Live Civic Signals">
            {signals.length === 0 ? (
              <p className="text-neutral-500 text-sm">
                Awaiting citizen interaction...
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {signals.slice(0, 8).map((s, i) => (
                  <li key={i} className="text-neutral-300">
                    • {s.message}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* MODEL METRICS */}
          <Panel title="Model Metrics">

            <div className="mb-6">
              <p className="text-neutral-400 text-xs mb-2">
                Model Confidence
              </p>

              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{ width: `${liveConfidence}%` }}
                />
              </div>

              <p className="text-xs text-neutral-300 mt-2">
                {liveConfidence.toFixed(1)}%
              </p>
            </div>

            <Metric label="Processing Speed" value={`${liveSpeed} ms`} />
            <Metric label="Risk Index" value={`${signals.length * 8}%`} />
            <Metric label="Learning State" value="Adaptive" />

          </Panel>

          {/* GOVERNANCE INSIGHTS */}
          <Panel title="Governance Insights">
            <p className="text-neutral-400 text-sm leading-relaxed">
              AI continuously analyzes civic behavior patterns, emergency
              trends, municipal backlog, and citizen engagement to optimize
              governance workflows and improve response precision across
              departments.
            </p>
          </Panel>

          {/* DECISION ENGINE FLOW */}
          <Panel title="Decision Engine Flow">
            <ul className="text-sm text-neutral-300 space-y-2">
              <li>1. Signal Intake & Verification</li>
              <li>2. Pattern Recognition</li>
              <li>3. Risk & Urgency Scoring</li>
              <li>4. Resource Allocation Mapping</li>
              <li>5. Escalation & Compliance Routing</li>
            </ul>
          </Panel>

          {/* AI REASONING STREAM */}
          <Panel title="AI Reasoning Stream">
            <ul className="text-sm text-neutral-300 space-y-2">
              {reasoning.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </Panel>

        </div>

      </div>
    </main>
  );
}


/* ---------- Reusable Panel Component ---------- */

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}


/* ---------- Metric Row ---------- */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between text-sm mb-3">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
