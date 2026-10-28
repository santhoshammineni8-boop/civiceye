"use client";

import { useState } from "react";

type Update = {
  title: string;
  department: string;
  summary: string;
  whyItMatters: string;
};

export default function GovtUpdatesPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUpdates = () => {
    setLoading(true);
    setLogs([]);
    setUpdates([]);

    const log = (m: string, t: number) =>
      setTimeout(() => setLogs((p) => [...p, m]), t);

    log("Fetching government updates for citizen locality", 300);
    log("Filtering updates by ward and state", 900);
    log("AI simplifying official language", 1500);
    log("Impact analysis for citizen profile", 2100);

    setTimeout(() => {
      setUpdates([
        {
          title: "Road Repair Budget Approved",
          department: "Municipal Roads Department",
          summary:
            "₹18 crores allocated for road resurfacing across 12 wards.",
          whyItMatters:
            "This increases the chance of pothole repairs in your area within the next 2 months.",
        },
        {
          title: "Water Supply Upgrade",
          department: "Water Board",
          summary:
            "Pipeline upgrades planned to reduce outages during summer.",
          whyItMatters:
            "Your locality has been marked for priority due to past complaints.",
        },
      ]);

      setLoading(false);
      log("AI generated citizen-friendly explanations", 2600);
    }, 2800);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-black
       font-bold mb-1">Government Updates</h1>
      <p className="text-gray-600 mb-4">
        AI-curated updates relevant to your locality
      </p>

      <button
        onClick={loadUpdates}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Load Today’s Updates
      </button>

      {loading && <p>AI analyzing government actions…</p>}

      {updates.map((u, i) => (
        <div key={i} className="text-gray-900
         p-4 rounded shadow mb-4">
          <h2 className="font-semibold">{u.title}</h2>
          <p className="text-xs text-gray-500">{u.department}</p>
          <p className="mt-2">{u.summary}</p>
          <p className="mt-2 text-sm text-gray-700">
            <b>Why this matters to you:</b> {u.whyItMatters}
          </p>
        </div>
      ))}

      <div className="bg-white text-gray-900 p-4 rounded shadow mt-6">
        <h2 className="font-semibold text-gray-500
 mb-2">AI Activity</h2>
        <ul className="text-sm space-y-1">
          {logs.map((l, i) => (
            <li key={i}>• {l}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
