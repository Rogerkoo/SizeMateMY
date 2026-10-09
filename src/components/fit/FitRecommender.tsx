import { useState } from "react";
import { recommendFit, type FitInput } from "../../data/fitRules";

type TightArea = NonNullable<FitInput["tightAreas"]>[number];

export default function FitRecommender() {
  const [preference, setPreference] = useState<NonNullable<FitInput["preference"]>>("Balanced");
  const [tightAreas, setTightAreas] = useState<TightArea[]>([]);
  const result = recommendFit({ preference, tightAreas });

  function toggleArea(area: TightArea) {
    setTightAreas((previous) =>
      previous.includes(area)
        ? previous.filter((selectedArea) => selectedArea !== area)
        : [...previous, area],
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-gray-600">Preference</div>
        <div className="mt-2 flex gap-2">
          {(["Slimmer", "Balanced", "Roomier"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setPreference(option)}
              className={`rounded border px-3 py-2 ${preference === option ? "border-black" : "border-gray-200"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-600">Tight areas (optional)</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["Collar", "Chest", "Thigh", "Waist", "Sleeves"] as const).map((area) => (
            <button
              key={area}
              onClick={() => toggleArea(area)}
              className={`rounded border px-3 py-2 ${tightAreas.includes(area) ? "border-black" : "border-gray-200"}`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded border p-4">
        <div className="text-sm text-gray-600">Suggested fit</div>
        <div className="mt-1 text-lg font-semibold">{result.fit}</div>
        {result.notes.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {result.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
