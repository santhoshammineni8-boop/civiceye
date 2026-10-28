"use client";

import { useRouter } from "next/navigation";
import { useCivicAI } from "../components/CivicAIContext";

export default function Dashboard() {
  const router = useRouter();
  const { addSignal } = useCivicAI();

  function openPage(path: string, name: string) {
    addSignal(`Citizen opened ${name}`);
    router.push(path);
  }

  return (
    <main className="min-h-screen bg-neutral-100 pt-24 pb-40">
      <div className="max-w-6xl mx-auto px-8">

        <h1 className="text-4xl font-bold mb-3 text-neutral-900">
          Civic Dashboard
        </h1>

        <p className="text-neutral-600 mb-10">
          Real-time AI-powered governance interface.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

  <DashboardCard
    title="Government Updates"
    description="Daily local actions, funds usage and policy transparency."
    onClick={() => openPage("/govt-updates", "Government Updates")}
  />

  <DashboardCard
    title="Policies & Allowances"
    description="Personalized government schemes you may qualify for."
    onClick={() => openPage("/policies", "Policies")}
  />

  <DashboardCard
    title="Municipal Issues"
    description="Report potholes, garbage, and public hazards."
    onClick={() => openPage("/municipal", "Municipal Issues")}
  />

  <DashboardCard
    title="Police Emergency"
    description="AI-assisted incident routing and alerts."
    onClick={() => openPage("/police", "Police Emergency")}
  />

  <DashboardCard
    title="Medical Emergency"
    description="AI triage support and emergency coordination."
    onClick={() => openPage("/medical", "Medical Emergency")}
  />

  <DashboardCard
    title="Youth Innovation"
    description="Submit ideas and evaluate funding feasibility."
    onClick={() => openPage("/youth", "Youth Innovation")}
  />
<DashboardCard
  title="My Complaints"
  description="Track resolution timeline & AI accountability."
  onClick={() => openPage("/my-complaints", "My Complaints")}
  highlight 
/>

</div>

      </div>
    </main>
  );
}

function DashboardCard({
  title,
  description,
  onClick,
  highlight,
}: {
  title: string;
  description: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${highlight ? "col-span-2 aspect-[8/3] bg-neutral-900 text-white" : "aspect-[4/3] bg-white text-neutral-900"}
        border border-neutral-200
        rounded-xl p-5
        flex flex-col justify-between
        text-left
        shadow-sm hover:shadow-md
        transition duration-300
        hover:-translate-y-1
      `}
    >
      <div>
        <h2
          className={`text-base font-semibold ${
            highlight ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </h2>

        <p
          className={`text-xs mt-2 leading-relaxed ${
            highlight ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          {description}
        </p>
      </div>

      <div
        className={`text-xs ${
          highlight ? "text-neutral-400" : "text-neutral-400"
        }`}
      >
        Open →
      </div>
    </button>
  );
}
