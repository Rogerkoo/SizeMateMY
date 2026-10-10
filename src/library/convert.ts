import type { Category, ConversionResult, SizeChartEntry } from "./types";
import type { SystemCode } from "./types";

type Confidence = "High" | "Medium" | "Low";

const confidenceRank: Record<Confidence, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

function overlap(aMin: number, aMax: number, bMin: number, bMax: number) {
  const start = Math.max(aMin, bMin);
  const end = Math.min(aMax, bMax);
  if (end < start) return 0;
  return end - start;
}

export function measurementKeyForCategory(category: Category): keyof SizeChartEntry["measurements"] {
  if (category === "Shoes") return "footLength";
  if (category === "Shirts") return "chest";
  return "waist";
}

function sameGroup(entry: SizeChartEntry, input: SizeChartEntry): boolean {
  const entryAudience = entry.audience ?? "Adults";
  const inputAudience = input.audience ?? "Adults";
  if (entryAudience !== inputAudience) return false;
  // Children entries have no gender; adults are split Men / Women.
  if (inputAudience === "Children") return true;
  return (entry.gender ?? "Men") === (input.gender ?? "Men");
}

export function convertSize(entries: SizeChartEntry[], input: SizeChartEntry): ConversionResult {
  const category = input.category;
  const key = measurementKeyForCategory(category);
  const inputRange = input.measurements[key];

  if (!inputRange) {
    throw new Error("Input entry missing measurement");
  }

  const matches: ConversionResult["matches"] = entries
    .filter(
      entry =>
        entry.category === category &&
        entry.system !== input.system &&
        sameGroup(entry, input),
    )
    .flatMap((entry) => {
      const candidateRange = entry.measurements[key];
      if (!candidateRange) return [];

      const overlapAmount = overlap(inputRange.min, inputRange.max, candidateRange.min, candidateRange.max);
      const inputLength = inputRange.max - inputRange.min;
      const ratio = inputLength > 0 ? overlapAmount / inputLength : 0;
      const confidence: Confidence = ratio >= 0.7 ? "High" : ratio >= 0.35 ? "Medium" : "Low";

      return [{
        system: entry.system,
        label: entry.label,
        confidence,
        reason: `${String(key)} overlap`,
      }];
    })
    .sort((a, b) => confidenceRank[a.confidence] - confidenceRank[b.confidence]);

  return {
    input: { system: input.system, label: input.label },
    matches,
    primaryMeasurement: { name: String(key), range: inputRange },
  };
}

export function bestMatchPerSystem(result: ConversionResult): Array<{
  system: SystemCode;
  label: string;
  confidence: "High" | "Medium" | "Low";
}> {
  const best = new Map<SystemCode, { label: string; confidence: "High" | "Medium" | "Low" }>();
  for (const m of result.matches) {
    if (!best.has(m.system)) best.set(m.system, { label: m.label, confidence: m.confidence });
  }
  return Array.from(best.entries()).map(([system, v]) => ({ system, ...v }));
}

export function matchesBySystem(result: ConversionResult): Array<{
  system: SystemCode;
  matches: Array<{ label: string; confidence: "High" | "Medium" | "Low"; reason: string }>;
}> {
  const map = new Map<SystemCode, Array<{ label: string; confidence: "High" | "Medium" | "Low"; reason: string }>>();
  for (const m of result.matches) {
    const arr = map.get(m.system) ?? [];
    arr.push({ label: m.label, confidence: m.confidence, reason: m.reason });
    map.set(m.system, arr);
  }
  return Array.from(map.entries()).map(([system, matches]) => ({ system, matches }));
}