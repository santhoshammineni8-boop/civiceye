"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleLogin = () => {
    if (otp === "123456") {
      localStorage.setItem(
        "citizen",
        JSON.stringify({
          name: "Demo Citizen",
          phone,
          state: "Telangana",
          age: 22,
          income: "Low",
          credibility: 70,
        })
      );
      router.push("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-80 shadow">
        <h2 className="text-black text-xl font-bold mb-4">Citizen Login</h2>

        {step === 1 && (
          <>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full text-blue-400 border p-2 mb-4 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="w-full bg-black text-white py-2 rounded"
              onClick={() => setStep(2)}
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP (123456)"
              className="w-full text-blue-400 border p-2 mb-4 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-black text-white py-2 rounded"
              onClick={handleLogin}
            >
              Verify & Login
            </button>
          </>
        )}
      </div>
    </main>
  );
}
