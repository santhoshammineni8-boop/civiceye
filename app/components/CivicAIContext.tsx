"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Signal = {
  message: string;
  timestamp: number;
};

type CivicAIType = {
  signals: Signal[];
  confidence: number;
  speed: number;
  addSignal: (msg: string) => void;
};

const CivicAIContext = createContext<CivicAIType | null>(null);

export function CivicAIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [confidence, setConfidence] = useState(72);
  const [speed, setSpeed] = useState(12);

  function addSignal(message: string) {
    setSignals((prev) => [
      { message, timestamp: Date.now() },
      ...prev.slice(0, 9),
    ]);
  }

  // Simulate learning updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence((prev) =>
        prev >= 95 ? 72 : parseFloat((prev + 0.5).toFixed(1))
      );
      setSpeed((prev) => (prev >= 20 ? 10 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CivicAIContext.Provider
      value={{ signals, confidence, speed, addSignal }}
    >
      {children}
    </CivicAIContext.Provider>
  );
}

export function useCivicAI() {
  const ctx = useContext(CivicAIContext);
  if (!ctx) {
    throw new Error("useCivicAI must be used inside CivicAIProvider");
  }
  return ctx;
}
