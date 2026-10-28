"use client";
import CivicAIBrain from "../components/CivicAIBrain";
import { useEffect, useState } from "react";

type CitizenProfile = {
  name: string;
  age: number;
  gender: string;
  location: string;
  aadhaarMasked: string;
  digilockerConnected: boolean;
  documents: string[];
};

export default function ProfilePage() {
  /* ---------- HOOKS ---------- */
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /* ---------- LOG HELPER ---------- */
  const log = (msg: string, t: number) =>
    setTimeout(() => setLogs((p) => [...p, msg]), t);

  /* ---------- DIGILOCKER CONNECT ---------- */
  const connectDigiLocker = () => {
    setLoading(true);
    setLogs([]);

    log("Citizen initiated DigiLocker connection", 300);
    log("Consent verified for document access", 900);
    log("Fetching identity metadata (simulated)", 1500);
    log("Masking Aadhaar and securing profile", 2100);
    log("Building unified citizen identity", 2700);

    setTimeout(() => {
      setProfile({
        name: "Ravi Kumar",
        age: 27,
        gender: "Male",
        location: "Ward 23, Hyderabad",
        aadhaarMasked: "XXXX-XXXX-1234",
        digilockerConnected: true,
        documents: [
          "Aadhaar Card",
          "Driving License",
          "Income Certificate",
          "Caste Certificate",
        ],
      });

      setLoading(false);
      log("Citizen profile successfully created", 3300);
    }, 3500);
  };

  return (
    <main className="min-h-screen text-gray-900 bg-gray-100 p-6">
      <h1 className="text-2xl text-gray-900 font-bold mb-1">Citizen Profile</h1>
      <p className="text-gray-600 mb-6">
        Your verified identity for accessing all government services
      </p>

      {/* EMPTY STATE */}
      {!profile && !loading && (
        <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">
            Create Your Verified Profile
          </h2>
          <p className="text-sm text-gray-900 text-gray-600 mb-3">
            Linking DigiLocker helps the system personalize benefits, emergency
            response, and civic services for you.
          </p>

          <ul className="text-sm text-gray-900 list-disc ml-6 mb-4">
            <li>Auto-check policy eligibility</li>
            <li>Faster medical & police response</li>
            <li>Ward-based municipal services</li>
            <li>Realistic youth funding guidance</li>
          </ul>

          <button
            onClick={connectDigiLocker}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Connect DigiLocker
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
           Verifying identity and building citizen profile…
        </div>
      )}

      {/* PROFILE DETAILS */}
      {profile && (
        <>
          <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
            <h2 className="font-semibold mb-3">
              Verified Citizen Details ✅
            </h2>

            <ul className="text-sm text-gray-900 space-y-1">
              <li>Name: {profile.name}</li>
              <li>Age: {profile.age}</li>
              <li>Gender: {profile.gender}</li>
              <li>Location: {profile.location}</li>
              <li>Aadhaar: {profile.aadhaarMasked}</li>
              <li>Status: DigiLocker Connected</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mt-4 mb-2">
              Linked Documents
            </h3>
            <ul className="list-disc text-gray-900 ml-6 text-sm">
              {profile.documents.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* PROFILE USAGE */}
          <div className="bg-white p-4 text-gray-900 rounded shadow mb-6">
            <h2 className="font-semibold mb-2">
              Where Your Profile Is Used
            </h2>
            <ul className="text-sm space-y-1">
              <li>• Policies & Allowances — eligibility checks</li>
              <li>• Medical — age-based risk assessment</li>
              <li>• Police — faster verification in emergencies</li>
              <li>• Municipal — ward & locality mapping</li>
              <li>• Youth — funding feasibility analysis</li>
            </ul>
          </div>
        </>
      )}

      {/* AI EXPLANATION */}
      <div className="bg-white p-4 text-gray-900 rounded shadow mb-6">
        <h2 className="font-semibold text-gray-900 mb-2">
           AI Identity & Privacy Explanation
        </h2>
        <ul className="text-sm text-gray-900 space-y-1">
          <li>• Only required data is accessed per service</li>
          <li>• Aadhaar is masked and never stored fully</li>
          <li>• No biometric or sensitive data used</li>
          <li>• Citizen consent is mandatory</li>
          <li>• Access can be revoked anytime</li>
        </ul>
      </div>

      {/* AI LOGS */}
      <div className="bg-white  text-gray-900 p-4 rounded shadow">
        <h2 className="font-semibold mb-2">
          AI Activity Monitor (Judge View)
        </h2>

        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No identity actions performed yet.
          </p>
        ) : (
          <ul className="text-sm text-gray-900 space-y-1">
            {logs.map((l, i) => (
              <li key={i}>• {l}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Identity linkage simulated for prototype demonstration only.
      </p>
    </main>
  );
}
