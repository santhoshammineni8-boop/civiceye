"use client";

import { useEffect, useState } from "react";
import { useCivicAI } from "../components/CivicAIContext";

type Complaint = {
  id: string;
  issue: string;
  description: string;
  status: string;
  createdAt: string;
  receiptName?: string | null;
};

export default function MyComplaintsPage() {
  const { signals } = useCivicAI();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  /* ---------- LOAD & AUTO ESCALATE ---------- */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("complaints") || "[]");

    const updated = stored.map((c: Complaint) => {
      const created = new Date(c.createdAt).getTime();
      const now = Date.now();

      const SLA_HOURS = 24;
      const expiry = created + SLA_HOURS * 60 * 60 * 1000;

      if (now > expiry && c.status === "Pending") {
        c.status = "Escalated";
      }

      return c;
    });

    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  }, []);

  /* ---------- TIME REMAINING ---------- */
  function getRemainingTime(createdAt: string) {
    const created = new Date(createdAt).getTime();
    const expiry = created + 24 * 60 * 60 * 1000;
    const remaining = expiry - Date.now();

    if (remaining <= 0) return "Expired";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const mins = Math.floor(
      (remaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${mins}m remaining`;
  }

  return (
    <main className="min-h-screen bg-neutral-100 pt-24 pb-40 px-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-neutral-900 mb-6">
          My Complaints
        </h1>

        <p className="text-neutral-600 mb-10">
          Track resolution timeline and AI accountability.
        </p>

        {/* ----------- REAL COMPLAINT HISTORY ----------- */}
        {complaints.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm mb-8">
            <p className="text-neutral-500 text-sm">
              No complaints filed yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-10">
            {complaints.map((c, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl shadow-sm border
                  ${
                    c.status === "Escalated"
                      ? "bg-red-50 border-red-300"
                      : "bg-white border-neutral-200"
                  }`}
              >
                <div className="flex justify-between mb-2">
                  <strong>{c.id}</strong>
                  <span className="text-xs">
                    {getRemainingTime(c.createdAt)}
                  </span>
                </div>

                <p className="text-sm mb-1">
                  <strong>Issue:</strong> {c.issue}
                </p>

                {c.description && (
                  <p className="text-sm text-neutral-600 mb-2">
                    {c.description}
                  </p>
                )}

                {c.receiptName && (
                  <p className="text-xs text-neutral-500 mb-2">
                    📎 {c.receiptName}
                  </p>
                )}

                <p className="text-sm">
                  Status:
                  <span
                    className={`ml-2 font-medium ${
                      c.status === "Escalated"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ----------- AI SIGNAL HISTORY (JUDGE VIEW) ----------- */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="font-semibold mb-3">
            AI Monitoring Activity
          </h2>

          {signals.length === 0 ? (
            <p className="text-neutral-500 text-sm">
              No AI activity yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {signals.map((s, i) => (
                <li
                  key={i}
                  className="border-b border-neutral-100 pb-2 text-sm text-neutral-700"
                >
                  {s.message}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </main>
  );
}
