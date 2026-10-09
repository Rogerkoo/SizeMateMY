import { useMemo, useState } from "react";
import { sizeChartEntries } from "../data/sizeCharts";
import { bestMatchPerSystem, convertSize, matchesBySystem, measurementKeyForCategory } from "../library/convert";
import { formatRange, prettyMeasurementName, type Unit } from "../library/format";
import type { Category, SizeAudience, SizeChartEntry, SystemCode } from "../library/types";

const categories: { value: Category; label: string }[] = [
  { value: "Shirts", label: "Shirts" },
  { value: "Pants", label: "Pants" },
  { value: "Shoes", label: "Shoes" },
];
const systemOrder: SystemCode[] = ["US", "UK", "EU", "VN", "JP", "CN", "KR"];
const defaultVisibleSystems: ReadonlySet<SystemCode> = new Set(["US", "UK", "EU"]);
const matchLevelLabels = {
  High: "Most overlap",
  Medium: "Some overlap",
  Low: "Little overlap",
} as const;

export default function SizeConverter() {
  const [category, setCategory] = useState<Category>("Shirts");
  const [audience, setAudience] = useState<SizeAudience>("Adults");
  const [mySize, setMySize] = useState<string>("XS");
  const [customSize, setCustomSize] = useState("");
  const [unit, setUnit] = useState<Unit>("cm");
  const [showSystems, setShowSystems] = useState<Partial<Record<SystemCode, boolean>>>({});
  const [showAlternatives, setShowAlternatives] = useState(false);

  const mySizes = useMemo(() => {
    return sizeChartEntries
      .filter(e => e.category === category && e.audience === audience && e.system === "MY")
      .map(e => e.label);
  }, [audience, category]);

  const footLengthBounds = useMemo(() => {
    if (category !== "Shoes") return undefined;

    const ranges = sizeChartEntries
      .filter(entry => entry.category === category && entry.audience === audience && entry.system === "MY")
      .map(entry => entry.measurements.footLength)
      .filter((range): range is NonNullable<typeof range> => range !== undefined);

    if (ranges.length === 0) return undefined;

    return {
      min: Math.min(...ranges.map(range => range.min)),
      max: Math.max(...ranges.map(range => range.max)),
    };
  }, [audience, category]);

  const shoeEntries = useMemo(
    () =>
      category === "Shoes"
        ? sizeChartEntries.filter(
            entry => entry.category === "Shoes" && entry.audience === audience && entry.system === "MY",
          )
        : [],
    [audience, category],
  );

  const inputEntry = useMemo<SizeChartEntry | undefined>(() => {
    if (!customSize.trim()) {
      return sizeChartEntries.find(
        entry =>
          entry.category === category &&
          entry.audience === audience &&
          entry.system === "MY" &&
          entry.label === mySize,
      );
    }

    if (category !== "Shoes" || !footLengthBounds) return undefined;

    const value = Number(customSize);
    if (
      !Number.isFinite(value) ||
      value < footLengthBounds.min ||
      value > footLengthBounds.max
    ) {
      return undefined;
    }

    const template = shoeEntries[0];
    if (!template) return undefined;

    const footLengthRange = {
      min: Math.max(footLengthBounds.min, value - 0.25),
      max: Math.min(footLengthBounds.max, value + 0.25),
    };

    return {
      ...template,
      label: `${value} cm`,
      measurements: {
        ...template.measurements,
        footLength: footLengthRange,
      },
    };
  }, [audience, category, customSize, footLengthBounds, mySize, shoeEntries]);

  const customSizeError = (() => {
    if (!customSize.trim() || category !== "Shoes" || !footLengthBounds) return "";

    const value = Number(customSize);
    if (!Number.isFinite(value)) return "Enter a valid foot length.";
    if (value < footLengthBounds.min || value > footLengthBounds.max) {
      return `Enter a foot length from ${footLengthBounds.min} to ${footLengthBounds.max} cm.`;
    }

    return inputEntry ? "" : "This size cannot be estimated from the available chart.";
  })();

  const result = useMemo(() => {
    if (!inputEntry) return null;
    return convertSize(sizeChartEntries, inputEntry);
  }, [inputEntry]);

  const grouped = useMemo(
    () => (result ? matchesBySystem(result) : []),
    [result],
  );

  const bestMatches = useMemo(
    () => (result ? bestMatchPerSystem(result) : []),
    [result],
  );

  const availableSystems = useMemo(() => {
    const systems = new Set(
      sizeChartEntries
        .filter(entry => entry.category === category && entry.system !== "MY")
        .filter(entry => entry.audience === audience)
        .map(entry => entry.system),
    );

    return systemOrder.filter(system => systems.has(system));
  }, [audience, category]);

  const nearbyGrouped = useMemo(() => {
    if (!result) return [];

    const measurementKey = measurementKeyForCategory(category);
    const inputMidpoint =
      (result.primaryMeasurement.range.min + result.primaryMeasurement.range.max) / 2;

    return matchesBySystem(result).map(group => {
      const orderedMatches = group.matches
        .flatMap(match => {
          const entry = sizeChartEntries.find(
            candidate =>
              candidate.category === category &&
              candidate.audience === audience &&
              candidate.system === group.system &&
              candidate.label === match.label,
          );
          const range = entry?.measurements[measurementKey];

          return range
            ? [{ ...match, midpoint: (range.min + range.max) / 2 }]
            : [];
        })
        .sort((a, b) => a.midpoint - b.midpoint);

      const closestIndex = orderedMatches.reduce(
        (closest, match, index) =>
          Math.abs(match.midpoint - inputMidpoint) <
          Math.abs(orderedMatches[closest].midpoint - inputMidpoint)
            ? index
            : closest,
        0,
      );

      return {
        ...group,
        matches: orderedMatches
          .slice(Math.max(0, closestIndex - 2), closestIndex + 3)
          .map(({ midpoint: _midpoint, ...match }) => match),
      };
    });
  }, [audience, category, result]);

  const isSystemVisible = (system: SystemCode) =>
    showSystems[system] ?? defaultVisibleSystems.has(system);

  return (
    <div className="space-y-4">
      <div className="flex gap-2" role="group" aria-label="Sizing audience">
        {(["Adults", "Children"] as const).map(option => (
          <button
            key={option}
            type="button"
            aria-pressed={audience === option}
            onClick={() => {
              setAudience(option);
              setCustomSize("");
              const firstSize = sizeChartEntries.find(
                entry => entry.category === category && entry.audience === option && entry.system === "MY",
              );
              if (firstSize) setMySize(firstSize.label);
            }}
            className={`px-3 py-2 rounded ${audience === option ? "bg-black text-white" : "bg-gray-100"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              setCategory(value);
              setCustomSize("");
              const firstSize = sizeChartEntries.find(
                entry =>
                  entry.category === value &&
                  entry.audience === audience &&
                  entry.system === "MY",
              );
              if (firstSize) setMySize(firstSize.label);
            }}
            className={`px-3 py-2 rounded ${category === value ? "bg-black text-white" : "bg-gray-100"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        <div className="text-sm text-gray-600">
          {audience === "Children" && category === "Shoes" ? "Foot length (MY)" : `${audience === "Children" ? "Children's" : "Malaysia"} size`}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {mySizes.map(s => (
            <button
              key={s}
              onClick={() => {
                setMySize(s);
                setCustomSize("");
              }}
              className={`px-3 py-2 rounded border ${mySize === s ? "border-black" : "border-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
        {category === "Shoes" && footLengthBounds && (
          <div className="mt-3">
            <label htmlFor="custom-size" className="block text-sm text-gray-600">
              Or enter foot length in cm
            </label>
            <input
              id="custom-size"
              type="number"
              step="0.1"
              min={footLengthBounds.min}
              max={footLengthBounds.max}
              value={customSize}
              onChange={event => setCustomSize(event.target.value)}
              placeholder={`e.g. ${footLengthBounds.min + 0.5}`}
              aria-invalid={Boolean(customSizeError)}
              aria-describedby="custom-size-help"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
            <p id="custom-size-help" className="mt-1 text-xs text-gray-500">
              Shoe conversions are estimated from foot length; check the brand's chart for the best fit.
            </p>
            {customSizeError && <p className="mt-1 text-sm text-red-700">{customSizeError}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {availableSystems.map(sys => (
            <label key={sys} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isSystemVisible(sys)}
                onChange={event =>
                  setShowSystems(previous => ({ ...previous, [sys]: event.target.checked }))
                }
              />
              {sys}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Units</span>
          <button
            onClick={() => setUnit("cm")}
            className={`px-2 py-1 rounded border ${unit === "cm" ? "border-black" : "border-gray-200"}`}
          >
            cm
          </button>
          <button
            onClick={() => setUnit("in")}
            className={`px-2 py-1 rounded border ${unit === "in" ? "border-black" : "border-gray-200"}`}
          >
            in
          </button>
        </div>
      </div>

      {result && (
        <div className="rounded border p-4 space-y-3">
          <div className="text-sm text-gray-600">
            Approximate conversion for <b>{result.input.label}</b> ({result.input.system})
          </div>

          <div className="text-sm">
            <span className="text-gray-600">{prettyMeasurementName(result.primaryMeasurement.name)}:</span>{" "}
            <span className="font-medium">
              {formatRange(result.primaryMeasurement.range.min, result.primaryMeasurement.range.max, unit)}
            </span>
          </div>

          <ul className="space-y-2">
            {bestMatches
              .filter(m => isSystemVisible(m.system))
              .map(m => (
                <li key={m.system} className="flex justify-between">
                  <span>{m.system}</span>
                  <span className="font-medium">{m.label}</span>
                </li>
              ))}
          </ul>

          <button
            onClick={() => setShowAlternatives(v => !v)}
            className="text-sm underline text-gray-700"
          >
            {showAlternatives ? "Hide alternatives" : "Show alternatives"}
          </button>

          {showAlternatives && (
            <div className="pt-2 border-t space-y-3">
              <p className="text-xs text-gray-500">
                Match labels describe measurement overlap. We show the closest match and up to two chart sizes on either side to keep alternatives easy to scan.
              </p>
              {nearbyGrouped
                .filter(g => isSystemVisible(g.system))
                .map(g => (
                  <div key={g.system}>
                    <div className="text-sm font-medium">{g.system}</div>
                    <ul className="mt-1 space-y-1 text-sm text-gray-700">
                      {g.matches.map(x => (
                        <li key={x.label} className="flex justify-between">
                          <span>{x.label}</span>
                          <span className="text-xs text-gray-500">{matchLevelLabels[x.confidence]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          <p className="text-xs text-gray-500">
            Note: sizing varies by brand and cut. Children's age-based charts are approximate; use body measurements or foot length as a guide.
          </p>
        </div>
      )}
    </div>
  );
}