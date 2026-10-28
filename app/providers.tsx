"use client";

import { CivicAIProvider } from "./components/CivicAIContext";
import CivicAIBrain from "./components/CivicAIBrain";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CivicAIProvider>
      {children}
      <CivicAIBrain />
    </CivicAIProvider>
  );
}
