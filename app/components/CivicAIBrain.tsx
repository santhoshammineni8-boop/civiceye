"use client";

import { useCivicAI } from "./CivicAIContext";

export default function CivicAIBrain() {
  const { signals, confidence, speed } = useCivicAI();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-8 py-5 grid grid-cols-4 gap-6 text-sm">

        <div>
          <p className="text-neutral-400 mb-1">Monitoring</p>
          <p>Active Signals: {signals.length}</p>
        </div>

        <div>
          <p className="text-neutral-400 mb-1">Model</p>
          <p>Confidence: {confidence}%</p>
          <p>Speed: {speed}ms</p>
        </div>

        <div>
          <p className="text-neutral-400 mb-1">Recent</p>
          {signals.length === 0 ? (
            <p className="text-neutral-500">No activity yet</p>
          ) : (
            <p>{signals[0].message}</p>
          )}
        </div>

        <div>
          <p className="text-neutral-400 mb-1">Engine</p>
          <p>Adaptive civic optimization active</p>
        </div>

      </div>
    </div>
  );
}
