"use client";

import { useState } from "react";

type AnalyzePayload = {
  dataUrl: string;
  analysisId: number;
};

type Props = {
  onAnalyze: (payload: AnalyzePayload) => void;
};

export default function ImageUpload({ onAnalyze }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState(0);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setAnalysisId((prev) => prev + 1); // 🔥 NEW SESSION
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="mb-4"
      />

      {preview && (
        <>
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded mb-4 object-contain"
            style={{ maxHeight: 320 }}
          />

          <button
            onClick={() =>
              onAnalyze({
                dataUrl: preview,
                analysisId,
              })
            }
            className="w-full bg-black text-white py-2 rounded"
          >
            Analyze with AI
          </button>
        </>
      )}
    </div>
  );
}
