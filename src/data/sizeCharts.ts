import type { Category, SizeAudience, SizeChartEntry, SystemCode } from "../library/types";

const malaysiaSizeEntries: SizeChartEntry[] = [
  // SHIRTS (chest cm)
  { system: "MY", category: "Shirts", label: "XS", measurements: { chest: { min: 88, max: 92 } } },
  { system: "MY", category: "Shirts", label: "S", measurements: { chest: { min: 92, max: 96 } } },
  { system: "MY", category: "Shirts", label: "M", measurements: { chest: { min: 96, max: 100 } } },
  { system: "MY", category: "Shirts", label: "L", measurements: { chest: { min: 100, max: 106 } } },
  { system: "MY", category: "Shirts", label: "XL", measurements: { chest: { min: 106, max: 112 } } },
  { system: "MY", category: "Shirts", label: "2XL", measurements: { chest: { min: 112, max: 118 } } },
  { system: "MY", category: "Shirts", label: "3XL", measurements: { chest: { min: 118, max: 124 } } },
  { system: "MY", category: "Shirts", label: "4XL", measurements: { chest: { min: 124, max: 130 } } },
  { system: "MY", category: "Shirts", label: "5XL", measurements: { chest: { min: 130, max: 136 } } },

  // PANTS (waist cm)
  { system: "MY", category: "Pants", label: "W28", measurements: { waist: { min: 71, max: 74 } } },
  { system: "MY", category: "Pants", label: "W29", measurements: { waist: { min: 73.5, max: 76.5 } } },
  { system: "MY", category: "Pants", label: "W30", measurements: { waist: { min: 76, max: 79 } } },
  { system: "MY", category: "Pants", label: "W31", measurements: { waist: { min: 78.5, max: 81.5 } } },
  { system: "MY", category: "Pants", label: "W32", measurements: { waist: { min: 81, max: 84 } } },
  { system: "MY", category: "Pants", label: "W33", measurements: { waist: { min: 83.5, max: 86.5 } } },
  { system: "MY", category: "Pants", label: "W34", measurements: { waist: { min: 86, max: 89 } } },
  { system: "MY", category: "Pants", label: "W35", measurements: { waist: { min: 88.5, max: 91.5 } } },
  { system: "MY", category: "Pants", label: "W36", measurements: { waist: { min: 91, max: 94 } } },
  { system: "MY", category: "Pants", label: "W37", measurements: { waist: { min: 93.5, max: 96.5 } } },
  { system: "MY", category: "Pants", label: "W38", measurements: { waist: { min: 96, max: 99 } } },
  { system: "MY", category: "Pants", label: "W39", measurements: { waist: { min: 98.5, max: 101.5 } } },
  { system: "MY", category: "Pants", label: "W40", measurements: { waist: { min: 101, max: 104 } } },
  { system: "MY", category: "Pants", label: "W41", measurements: { waist: { min: 103.5, max: 106.5 } } },
  { system: "MY", category: "Pants", label: "W42", measurements: { waist: { min: 106, max: 109 } } },
  { system: "MY", category: "Pants", label: "W43", measurements: { waist: { min: 108.5, max: 111.5 } } },
  { system: "MY", category: "Pants", label: "W44", measurements: { waist: { min: 111, max: 114 } } },

  // SHOES (foot length in cm; half sizes are interpolated between chart sizes)
  { system: "MY", category: "Shoes", label: "UK 6", measurements: { footLength: { min: 24.5, max: 25.0 } } },
  { system: "MY", category: "Shoes", label: "UK 6.5", measurements: { footLength: { min: 24.75, max: 25.25 } } },
  { system: "MY", category: "Shoes", label: "UK 7", measurements: { footLength: { min: 25.0, max: 25.5 } } },
  { system: "MY", category: "Shoes", label: "UK 7.5", measurements: { footLength: { min: 25.25, max: 25.85 } } },
  { system: "MY", category: "Shoes", label: "UK 8", measurements: { footLength: { min: 25.5, max: 26.2 } } },
  { system: "MY", category: "Shoes", label: "UK 8.5", measurements: { footLength: { min: 25.85, max: 26.6 } } },
  { system: "MY", category: "Shoes", label: "UK 9", measurements: { footLength: { min: 26.2, max: 27.0 } } },
  { system: "MY", category: "Shoes", label: "UK 9.5", measurements: { footLength: { min: 26.6, max: 27.4 } } },
  { system: "MY", category: "Shoes", label: "UK 10", measurements: { footLength: { min: 27.0, max: 27.8 } } },
  { system: "MY", category: "Shoes", label: "UK 10.5", measurements: { footLength: { min: 27.4, max: 28.15 } } },
  { system: "MY", category: "Shoes", label: "UK 11", measurements: { footLength: { min: 27.8, max: 28.5 } } },
  { system: "MY", category: "Shoes", label: "UK 11.5", measurements: { footLength: { min: 28.15, max: 28.85 } } },
  { system: "MY", category: "Shoes", label: "UK 12", measurements: { footLength: { min: 28.5, max: 29.2 } } },
  { system: "MY", category: "Shoes", label: "UK 12.5", measurements: { footLength: { min: 28.85, max: 29.55 } } },
  { system: "MY", category: "Shoes", label: "UK 13", measurements: { footLength: { min: 29.2, max: 29.9 } } },
  { system: "MY", category: "Shoes", label: "UK 13.5", measurements: { footLength: { min: 29.55, max: 30.25 } } },
  { system: "MY", category: "Shoes", label: "UK 14", measurements: { footLength: { min: 29.9, max: 30.6 } } },
];

type InternationalSystem = Exclude<SystemCode, "MY">;
type LabelsBySystem = Record<InternationalSystem, readonly string[]>;

const sizeLabels: Record<Category, LabelsBySystem> = {
  Shirts: {
    US: ["US XS", "US S", "US M", "US L", "US XL", "US 2XL", "US 3XL", "US 4XL", "US 5XL"],
    UK: ["UK XS", "UK S", "UK M", "UK L", "UK XL", "UK 2XL", "UK 3XL", "UK 4XL", "UK 5XL"],
    EU: ["EU 44", "EU 46", "EU 48", "EU 50", "EU 52", "EU 54", "EU 56", "EU 58", "EU 60"],
    VN: ["VN XS", "VN S", "VN M", "VN L", "VN XL", "VN 2XL", "VN 3XL", "VN 4XL", "VN 5XL"],
    JP: ["JP XS", "JP S", "JP M", "JP L", "JP LL", "JP 3L", "JP 4L", "JP 5L", "JP 6L"],
    CN: ["CN XS", "CN S", "CN M", "CN L", "CN XL", "CN 2XL", "CN 3XL", "CN 4XL", "CN 5XL"],
    KR: ["KR 90", "KR 95", "KR 100", "KR 105", "KR 110", "KR 115", "KR 120", "KR 125", "KR 130"],
  },
  Pants: {
    US: ["US W28", "US W29", "US W30", "US W31", "US W32", "US W33", "US W34", "US W35", "US W36", "US W37", "US W38", "US W39", "US W40", "US W41", "US W42", "US W43", "US W44"],
    UK: ["UK W28", "UK W29", "UK W30", "UK W31", "UK W32", "UK W33", "UK W34", "UK W35", "UK W36", "UK W37", "UK W38", "UK W39", "UK W40", "UK W41", "UK W42", "UK W43", "UK W44"],
    EU: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46", "EU 47", "EU 48", "EU 49", "EU 50", "EU 51", "EU 52", "EU 53", "EU 54"],
    VN: ["VN W28", "VN W29", "VN W30", "VN W31", "VN W32", "VN W33", "VN W34", "VN W35", "VN W36", "VN W37", "VN W38", "VN W39", "VN W40", "VN W41", "VN W42", "VN W43", "VN W44"],
    JP: ["JP 73", "JP 75.5", "JP 78", "JP 80.5", "JP 83", "JP 85.5", "JP 88", "JP 90.5", "JP 93", "JP 95.5", "JP 98", "JP 100.5", "JP 103", "JP 105.5", "JP 108", "JP 110.5", "JP 113"],
    CN: ["CN W28", "CN W29", "CN W30", "CN W31", "CN W32", "CN W33", "CN W34", "CN W35", "CN W36", "CN W37", "CN W38", "CN W39", "CN W40", "CN W41", "CN W42", "CN W43", "CN W44"],
    KR: ["KR 73", "KR 75.5", "KR 78", "KR 80.5", "KR 83", "KR 85.5", "KR 88", "KR 90.5", "KR 93", "KR 95.5", "KR 98", "KR 100.5", "KR 103", "KR 105.5", "KR 108", "KR 110.5", "KR 113"],
  },
  Shoes: {
    UK: ["UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5", "UK 9", "UK 9.5", "UK 10", "UK 10.5", "UK 11", "UK 11.5", "UK 12", "UK 12.5", "UK 13", "UK 13.5", "UK 14"],
    US: ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12", "US 12.5", "US 13", "US 13.5", "US 14", "US 14.5", "US 15"],
    EU: ["EU 40", "EU 40.5", "EU 41", "EU 41.5", "EU 42", "EU 42.5", "EU 43", "EU 43.5", "EU 44", "EU 45", "EU 46", "EU 46.5", "EU 47", "EU 47.5", "EU 48", "EU 48.5", "EU 49"],
    VN: ["VN 40", "VN 40.5", "VN 41", "VN 41.5", "VN 42", "VN 42.5", "VN 43", "VN 43.5", "VN 44", "VN 45", "VN 46", "VN 46.5", "VN 47", "VN 47.5", "VN 48", "VN 48.5", "VN 49"],
    JP: ["JP 25", "JP 25.25", "JP 25.5", "JP 25.75", "JP 26", "JP 26.25", "JP 26.5", "JP 27", "JP 27.5", "JP 27.75", "JP 28", "JP 28.5", "JP 29", "JP 29.25", "JP 29.5", "JP 30", "JP 30.5"],
    CN: ["CN 40", "CN 40.5", "CN 41", "CN 41.5", "CN 42", "CN 42.5", "CN 43", "CN 43.5", "CN 44", "CN 45", "CN 46", "CN 46.5", "CN 47", "CN 47.5", "CN 48", "CN 48.5", "CN 49"],
    KR: ["KR 250", "KR 252.5", "KR 255", "KR 257.5", "KR 260", "KR 262.5", "KR 265", "KR 270", "KR 275", "KR 277.5", "KR 280", "KR 285", "KR 290", "KR 292.5", "KR 295", "KR 300", "KR 305"],
  },
};

const childrenSizeEntries: SizeChartEntry[] = [
  // Children's clothing charts are approximate; use body measurements as the guide.
  { system: "MY", category: "Shirts", label: "2Y", measurements: { chest: { min: 54, max: 56 } } },
  { system: "MY", category: "Shirts", label: "4Y", measurements: { chest: { min: 56, max: 60 } } },
  { system: "MY", category: "Shirts", label: "6Y", measurements: { chest: { min: 60, max: 64 } } },
  { system: "MY", category: "Shirts", label: "8Y", measurements: { chest: { min: 64, max: 68 } } },
  { system: "MY", category: "Shirts", label: "10Y", measurements: { chest: { min: 68, max: 72 } } },
  { system: "MY", category: "Shirts", label: "12Y", measurements: { chest: { min: 72, max: 76 } } },
  { system: "MY", category: "Shirts", label: "14Y", measurements: { chest: { min: 76, max: 80 } } },
  { system: "MY", category: "Pants", label: "2Y", measurements: { waist: { min: 50, max: 52 } } },
  { system: "MY", category: "Pants", label: "4Y", measurements: { waist: { min: 52, max: 54 } } },
  { system: "MY", category: "Pants", label: "6Y", measurements: { waist: { min: 54, max: 57 } } },
  { system: "MY", category: "Pants", label: "8Y", measurements: { waist: { min: 57, max: 60 } } },
  { system: "MY", category: "Pants", label: "10Y", measurements: { waist: { min: 60, max: 63 } } },
  { system: "MY", category: "Pants", label: "12Y", measurements: { waist: { min: 63, max: 66 } } },
  { system: "MY", category: "Pants", label: "14Y", measurements: { waist: { min: 66, max: 70 } } },
  ...Array.from({ length: 23 }, (_, index) => {
    const footLength = 12 + index * 0.5;
    const sizeLabel = Number.isInteger(footLength) ? String(footLength) : footLength.toFixed(1);
    return {
      system: "MY" as const,
      category: "Shoes" as const,
      label: `${sizeLabel} cm`,
      measurements: { footLength: { min: footLength - 0.5, max: footLength } },
    };
  }),
];

const childrenSizeLabels: Record<Category, LabelsBySystem> = {
  Shirts: {
    US: ["US 2T", "US 4T", "US 6", "US 8", "US 10", "US 12", "US 14"],
    UK: ["UK 2-3Y", "UK 4-5Y", "UK 6-7Y", "UK 8-9Y", "UK 10-11Y", "UK 12-13Y", "UK 14Y"],
    EU: ["EU 92", "EU 104", "EU 116", "EU 128", "EU 140", "EU 152", "EU 164"],
    VN: ["VN 2Y", "VN 4Y", "VN 6Y", "VN 8Y", "VN 10Y", "VN 12Y", "VN 14Y"],
    JP: ["JP 90", "JP 100", "JP 110", "JP 120", "JP 130", "JP 150", "JP 160"],
    CN: ["CN 90", "CN 100", "CN 110", "CN 120", "CN 130", "CN 150", "CN 160"],
    KR: ["KR 90", "KR 100", "KR 110", "KR 120", "KR 130", "KR 150", "KR 160"],
  },
  Pants: {
    US: ["US 2T", "US 4T", "US 6", "US 8", "US 10", "US 12", "US 14"],
    UK: ["UK 2-3Y", "UK 4-5Y", "UK 6-7Y", "UK 8-9Y", "UK 10-11Y", "UK 12-13Y", "UK 14Y"],
    EU: ["EU 92", "EU 104", "EU 116", "EU 128", "EU 140", "EU 152", "EU 164"],
    VN: ["VN 2Y", "VN 4Y", "VN 6Y", "VN 8Y", "VN 10Y", "VN 12Y", "VN 14Y"],
    JP: ["JP 90", "JP 100", "JP 110", "JP 120", "JP 130", "JP 150", "JP 160"],
    CN: ["CN 90", "CN 100", "CN 110", "CN 120", "CN 130", "CN 150", "CN 160"],
    KR: ["KR 90", "KR 100", "KR 110", "KR 120", "KR 130", "KR 150", "KR 160"],
  },
  Shoes: {
    US: ["US 5C", "US 5.5C", "US 6C", "US 6.5C", "US 7C", "US 7.5C", "US 8C", "US 8.5C", "US 9C", "US 9.5C", "US 10C", "US 10.5C", "US 11C", "US 11.5C", "US 12C", "US 12.5C", "US 13C", "US 13.5C", "US 1Y", "US 1.5Y", "US 2Y", "US 2.5Y", "US 3Y"],
    UK: ["UK 4C", "UK 4.5C", "UK 5C", "UK 5.5C", "UK 6C", "UK 6.5C", "UK 7C", "UK 7.5C", "UK 8C", "UK 8.5C", "UK 9C", "UK 9.5C", "UK 10C", "UK 10.5C", "UK 11C", "UK 11.5C", "UK 12C", "UK 12.5C", "UK 13C", "UK 13.5C", "UK 1", "UK 1.5", "UK 2"],
    EU: ["EU 21", "EU 21.5", "EU 22", "EU 22.5", "EU 23", "EU 23.5", "EU 24", "EU 24.5", "EU 25", "EU 25.5", "EU 26", "EU 26.5", "EU 27", "EU 27.5", "EU 28", "EU 28.5", "EU 29", "EU 29.5", "EU 30", "EU 30.5", "EU 31", "EU 31.5", "EU 32"],
    VN: ["VN 21", "VN 21.5", "VN 22", "VN 22.5", "VN 23", "VN 23.5", "VN 24", "VN 24.5", "VN 25", "VN 25.5", "VN 26", "VN 26.5", "VN 27", "VN 27.5", "VN 28", "VN 28.5", "VN 29", "VN 29.5", "VN 30", "VN 30.5", "VN 31", "VN 31.5", "VN 32"],
    JP: ["JP 12", "JP 12.5", "JP 13", "JP 13.5", "JP 14", "JP 14.5", "JP 15", "JP 15.5", "JP 16", "JP 16.5", "JP 17", "JP 17.5", "JP 18", "JP 18.5", "JP 19", "JP 19.5", "JP 20", "JP 20.5", "JP 21", "JP 21.5", "JP 22", "JP 22.5", "JP 23"],
    CN: ["CN 21", "CN 21.5", "CN 22", "CN 22.5", "CN 23", "CN 23.5", "CN 24", "CN 24.5", "CN 25", "CN 25.5", "CN 26", "CN 26.5", "CN 27", "CN 27.5", "CN 28", "CN 28.5", "CN 29", "CN 29.5", "CN 30", "CN 30.5", "CN 31", "CN 31.5", "CN 32"],
    KR: ["KR 120", "KR 125", "KR 130", "KR 135", "KR 140", "KR 145", "KR 150", "KR 155", "KR 160", "KR 165", "KR 170", "KR 175", "KR 180", "KR 185", "KR 190", "KR 195", "KR 200", "KR 205", "KR 210", "KR 215", "KR 220", "KR 225", "KR 230"],
  },
};

function createInternationalEntries(
  category: Category,
  sourceEntries: SizeChartEntry[],
  labelsBySystem: Record<Category, LabelsBySystem>,
  audience: SizeAudience,
): SizeChartEntry[] {
  const categoryEntries = sourceEntries.filter(entry => entry.category === category);

  return (Object.keys(labelsBySystem[category]) as InternationalSystem[]).flatMap(system => {
    const labels = labelsBySystem[category][system];

    if (labels.length !== categoryEntries.length) {
      throw new Error(
        `Expected ${categoryEntries.length} ${category} labels for ${system}, received ${labels.length}.`,
      );
    }

    return categoryEntries.map((entry, index) => {
      const label = labels[index];
      if (!label) {
        throw new Error(`Missing ${system} ${category} size label at index ${index}.`);
      }

      return {
        ...entry,
        audience,
        system,
        label,
      };
    });
  });
}

export const sizeChartEntries: SizeChartEntry[] = [
  ...malaysiaSizeEntries.map(entry => ({ ...entry, audience: "Adults" as const })),
  ...childrenSizeEntries.map(entry => ({ ...entry, audience: "Children" as const })),
  ...(["Shirts", "Pants", "Shoes"] as const).flatMap(category =>
    createInternationalEntries(category, malaysiaSizeEntries, sizeLabels, "Adults"),
  ),
  ...(["Shirts", "Pants", "Shoes"] as const).flatMap(category =>
    createInternationalEntries(category, childrenSizeEntries, childrenSizeLabels, "Children"),
  ),
];
