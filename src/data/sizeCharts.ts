import type { Category, SizeChartEntry, SizeGender, SystemCode } from "../library/types";

const r1 = (v: number) => Math.round(v * 10) / 10;
const inch = (n: number) => n * 2.54;

// ---------- ADULT MEN ----------
// Source: Uniqlo
const menShirts: Array<[SystemCode, string, number, number]> = [
  ["MY", "XS", 78, 84], ["MY", "S", 80, 88], ["MY", "M", 88, 96], ["MY", "L", 96, 104],
  ["MY", "XL", 104, 112], ["MY", "2XL", 112, 120], ["MY", "3XL", 120, 128], ["MY", "4XL", 128, 136], ["MY", "5XL", 136, 144],
  ["US", "US XS", 84, 88], ["US", "US S", 88, 92], ["US", "US M", 92, 98], ["US", "US L", 98, 106],
  ["US", "US XL", 106, 112], ["US", "US 2XL", 112, 120], ["US", "US 3XL", 120, 128], ["US", "US 4XL", 128, 136], ["US", "US 5XL", 136, 144],
  ["UK", "UK XS", 86, 90], ["UK", "UK S", 90, 94], ["UK", "UK M", 94, 100], ["UK", "UK L", 100, 108],
  ["UK", "UK XL", 108, 116], ["UK", "UK 2XL", 116, 124], ["UK", "UK 3XL", 124, 132], ["UK", "UK 4XL", 132, 140], ["UK", "UK 5XL", 140, 148],
  ["EU", "EU 44", 88, 92], ["EU", "EU 46", 92, 96], ["EU", "EU 48", 96, 100], ["EU", "EU 50", 100, 104],
  ["EU", "EU 52", 104, 110], ["EU", "EU 54", 110, 116], ["EU", "EU 56", 116, 122], ["EU", "EU 58", 122, 128], ["EU", "EU 60", 128, 134],
  // Adjusted for Vietnam
  ["VN", "VN XS", 70, 76], ["VN", "VN S", 76, 82], ["VN", "VN M", 82, 86], ["VN", "VN L", 86, 92], ["VN", "VN XL", 92, 98],
  ["VN", "VN 2XL", 98, 104], ["VN", "VN 3XL", 104, 112], ["VN", "VN 4XL", 112, 120], ["VN", "VN 5XL", 120, 128], ["VN", "VN 6XL", 128, 136], ["VN", "VN 7XL", 136, 144],
  ["JP", "JP S", 88, 92], ["JP", "JP M", 92, 98], ["JP", "JP L", 98, 104], ["JP", "JP LL", 104, 110],
  ["JP", "JP 3L", 110, 118], ["JP", "JP 4L", 118, 126], ["JP", "JP 5L", 126, 134], ["JP", "JP 6L", 134, 142], ["JP", "JP 7L", 142, 150],
  ["CN", "CN S", 86, 90], ["CN", "CN M", 90, 96], ["CN", "CN L", 96, 102], ["CN", "CN XL", 102, 108],
  ["CN", "CN 2XL", 108, 116], ["CN", "CN 3XL", 116, 124], ["CN", "CN 4XL", 124, 132], ["CN", "CN 5XL", 132, 140], ["CN", "CN 6XL", 140, 148],
  ["KR", "KR 90", 88, 92], ["KR", "KR 95", 92, 96], ["KR", "KR 100", 96, 100], ["KR", "KR 105", 100, 106],
  ["KR", "KR 110", 106, 112], ["KR", "KR 115", 112, 118], ["KR", "KR 120", 118, 124], ["KR", "KR 125", 124, 130], ["KR", "KR 130", 130, 136],
];

const menPants: Array<[SystemCode, string, number, number]> = (() => {
  const rows: Array<[SystemCode, string, number, number]> = [];
  for (let w = 28; w <= 44; w++) {
    const b = inch(w);
    rows.push(["MY", `W${w}`, r1(b - 1.6), r1(b + 1.6)]);
    rows.push(["US", `US W${w}`, r1(b - 1.5), r1(b + 1.5)]);
    rows.push(["UK", `UK W${w}`, r1(b + 0.5), r1(b + 3.5)]);
    rows.push(["VN", `VN ${w}`, r1(b - 1), r1(b + 3)]);
    rows.push(["KR", `KR ${w}`, r1(b + 0.3), r1(b + 2.7)]);
  }
  const euWaist: Array<[number, number, number]> = [
    [38, 70, 74], [39, 74, 78], [40, 78, 82], [41, 82, 86], [42, 86, 90], [43, 90, 94], [44, 94, 98], [45, 98, 102],
    [46, 102, 106], [47, 106, 110], [48, 110, 114], [49, 114, 118], [50, 118, 122], [51, 122, 126], [52, 126, 130], [53, 130, 134], [54, 134, 138],
  ];
  for (const [eu, mn, mx] of euWaist) rows.push(["EU", `EU ${eu}`, mn, mx]);
  for (let jp = 73; jp <= 106; jp += 3) rows.push(["JP", `JP ${jp}`, jp - 1.5, jp + 1.5]);
  for (let cn = 70; cn <= 110; cn += 5) rows.push(["CN", `CN ${cn}`, cn - 2, cn + 2]);
  return rows;
})();

// MY men's shoes follow the UK scale exactly.
const menShoes: Array<[SystemCode, string, number, number]> = [
  ["MY", "UK 6", 24.2, 24.8], ["MY", "UK 6.5", 24.5, 25.1], ["MY", "UK 7", 24.8, 25.4], ["MY", "UK 7.5", 25.1, 25.7],
  ["MY", "UK 8", 25.4, 26.0], ["MY", "UK 8.5", 25.7, 26.3], ["MY", "UK 9", 26.0, 26.6], ["MY", "UK 9.5", 26.3, 26.9],
  ["MY", "UK 10", 26.6, 27.2], ["MY", "UK 10.5", 26.9, 27.5], ["MY", "UK 11", 27.2, 27.8], ["MY", "UK 11.5", 27.5, 28.1],
  ["MY", "UK 12", 27.8, 28.4], ["MY", "UK 12.5", 28.1, 28.7], ["MY", "UK 13", 28.4, 29.0], ["MY", "UK 13.5", 28.7, 29.3], ["MY", "UK 14", 29.0, 29.6],
  ["US", "US 7", 24.5, 25.0], ["US", "US 7.5", 24.8, 25.3], ["US", "US 8", 25.1, 25.6], ["US", "US 8.5", 25.4, 25.9],
  ["US", "US 9", 25.7, 26.3], ["US", "US 9.5", 26.0, 26.6], ["US", "US 10", 26.3, 26.9], ["US", "US 10.5", 26.6, 27.2],
  ["US", "US 11", 26.9, 27.5], ["US", "US 11.5", 27.2, 27.8], ["US", "US 12", 27.5, 28.1], ["US", "US 12.5", 27.8, 28.4],
  ["US", "US 13", 28.1, 28.7], ["US", "US 13.5", 28.4, 29.0], ["US", "US 14", 28.7, 29.3],
  ["UK", "UK 6", 24.2, 24.8], ["UK", "UK 6.5", 24.5, 25.1], ["UK", "UK 7", 24.8, 25.4], ["UK", "UK 7.5", 25.1, 25.7],
  ["UK", "UK 8", 25.4, 26.0], ["UK", "UK 8.5", 25.7, 26.3], ["UK", "UK 9", 26.0, 26.6], ["UK", "UK 9.5", 26.3, 26.9],
  ["UK", "UK 10", 26.6, 27.2], ["UK", "UK 10.5", 26.9, 27.5], ["UK", "UK 11", 27.2, 27.8], ["UK", "UK 11.5", 27.5, 28.1],
  ["UK", "UK 12", 27.8, 28.4], ["UK", "UK 12.5", 28.1, 28.7], ["UK", "UK 13", 28.4, 29.0], ["UK", "UK 13.5", 28.7, 29.3], ["UK", "UK 14", 29.0, 29.6],
  ["EU", "EU 39", 24.5, 25.0], ["EU", "EU 40", 24.8, 25.3], ["EU", "EU 41", 25.1, 25.7], ["EU", "EU 42", 25.4, 26.0],
  ["EU", "EU 43", 25.7, 26.3], ["EU", "EU 44", 26.0, 26.6], ["EU", "EU 45", 26.3, 26.9], ["EU", "EU 46", 26.6, 27.2],
  ["EU", "EU 47", 26.9, 27.5], ["EU", "EU 48", 27.2, 27.8], ["EU", "EU 49", 27.5, 28.1], ["EU", "EU 50", 27.8, 28.4],
  ["EU", "EU 51", 28.1, 28.7], ["EU", "EU 52", 28.4, 29.0], ["EU", "EU 53", 28.7, 29.3], ["EU", "EU 54", 29.0, 29.6],
  ["VN", "VN 38", 24.3, 24.8], ["VN", "VN 39", 24.6, 25.1], ["VN", "VN 40", 24.9, 25.4], ["VN", "VN 41", 25.2, 25.7],
  ["VN", "VN 42", 25.5, 26.0], ["VN", "VN 43", 25.8, 26.3], ["VN", "VN 44", 26.1, 26.6], ["VN", "VN 45", 26.4, 26.9],
  ["VN", "VN 46", 26.7, 27.2], ["VN", "VN 47", 27.0, 27.5], ["VN", "VN 48", 27.3, 27.8], ["VN", "VN 49", 27.6, 28.1],
  ["VN", "VN 50", 27.9, 28.4], ["VN", "VN 51", 28.2, 28.7], ["VN", "VN 52", 28.5, 29.0], ["VN", "VN 53", 28.8, 29.3],
  ...[24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30].map((jp): [SystemCode, string, number, number] =>
    ["JP", `JP ${jp.toFixed(1)}`, r1(jp - 0.3), r1(jp + 0.3)]),
  ...Array.from({ length: 12 }, (_, i): [SystemCode, string, number, number] => {
    const mm = 245 + i * 5;
    return ["CN", `CN ${mm}`, r1(mm / 10 - 0.3), r1(mm / 10 + 0.3)];
  }),
  ...Array.from({ length: 12 }, (_, i): [SystemCode, string, number, number] => {
    const mm = 245 + i * 5;
    return ["KR", `KR ${mm}`, r1(mm / 10 - 0.25), r1(mm / 10 + 0.25)];
  }),
];

// ---------- ADULT WOMEN ----------
const womenShirts: Array<[SystemCode, string, Category, number, number, string?]> = (() => {
  const rows: Array<[SystemCode, string, Category, number, number, string?]> = [];
  const usBust: Array<[number, number]> = [[2, 82.5], [4, 85], [6, 87.5], [8, 90], [10, 92.5], [12, 96.5], [14, 100.5], [16, 104], [18, 109], [20, 114]];
  for (const [n, c] of usBust) {
    rows.push(["US", `US ${n}`, "Shirts", c - 2, c + 2]);
    rows.push(["UK", `UK ${n + 4}`, "Shirts", c - 2, c + 2]);
    rows.push(["EU", `EU ${n + 32}`, "Shirts", c - 2, c + 2]);
    rows.push(["JP", `JP ${n + 3}`, "Shirts", c - 2, c + 2]);
  }
  const letters: Array<[string, number, number]> = [
    ["XS", 80, 84], ["S", 84, 88], ["M", 88, 93], ["L", 93, 99], ["XL", 99, 105], ["2XL", 105, 113], ["3XL", 113, 121], ["4XL", 121, 129],
  ];
  for (const [lab, mn, mx] of letters) {
    rows.push(["MY", lab, "Shirts", mn, mx]);
    rows.push(["VN", `VN ${lab}`, "Shirts", mn, mx]);
  }
  const cn: Array<[string, number, number]> = [
    ["155/80A", 80, 84], ["160/84A", 84, 88], ["165/88A", 88, 92], ["170/92A", 92, 96.5],
    ["175/96A", 96.5, 101], ["175/100A", 101, 106.5], ["180/104A", 106.5, 112], ["180/110A", 112, 118],
  ];
  for (const [lab, mn, mx] of cn) rows.push(["CN", `CN ${lab}`, "Shirts", mn, mx]);
  const kr: Array<[string, number, number]> = [["44", 78, 82], ["55", 83, 87], ["66", 87, 93], ["77", 93, 100], ["88", 100, 108], ["99", 108, 116]];
  for (const [lab, mn, mx] of kr) rows.push(["KR", `KR ${lab}`, "Shirts", mn, mx]);
  return rows;
})();

const womenPants: Array<[SystemCode, string, Category, number, number, string?]> = (() => {
  const rows: Array<[SystemCode, string, Category, number, number, string?]> = [];
  const usWaist: Array<[number, number]> = [[2, 61], [4, 63.5], [6, 66], [8, 68.5], [10, 71], [12, 75], [14, 79], [16, 82.5], [18, 87.5], [20, 93]];
  for (const [n, w] of usWaist) {
    rows.push(["US", `US ${n}`, "Pants", w - 1.5, w + 1.5]);
    rows.push(["UK", `UK ${n + 4}`, "Pants", w - 1.5, w + 1.5]);
    rows.push(["EU", `EU ${n + 32}`, "Pants", w - 1.5, w + 1.5]);
    rows.push(["JP", `JP ${n + 3}`, "Pants", w - 1.5, w + 1.5]);
  }
  const letters: Array<[string, number, number]> = [
    ["XS", 58, 62], ["S", 62, 66], ["M", 66, 71], ["L", 71, 77], ["XL", 77, 83], ["2XL", 83, 91], ["3XL", 91, 99], ["4XL", 99, 107],
  ];
  for (const [lab, mn, mx] of letters) {
    rows.push(["MY", lab, "Pants", mn, mx]);
    rows.push(["VN", `VN ${lab}`, "Pants", mn, mx]);
  }
  for (let i = 24; i <= 36; i += 2) {
    const b = inch(i);
    rows.push(["CN", `CN ${i}`, "Pants", r1(b - 1.5), r1(b + 1.5)]);
  }
  for (let i = 24; i <= 34; i += 2) {
    const b = inch(i);
    rows.push(["KR", `KR ${i}`, "Pants", r1(b - 1), r1(b + 2)]);
  }
  return rows;
})();

// (foot cm, US, UK, EU, JP) — women's shoe anchors
const womenShoeAnchors: Array<[number, string, string, string, string]> = [
  [21.8, "5", "2.5", "35", "21"], [22.5, "6", "3.5", "36", "22"], [23.2, "6.5", "4", "37", "22.5"], [23.5, "7", "4.5", "37.5", "23"],
  [23.8, "7.5", "5", "38", "23.5"], [24.2, "8", "5.5", "38.5", "24"], [24.5, "8.5", "6", "39", "24.5"],
  [25.2, "9", "6.5", "40", "25"], [25.8, "9.5", "7", "41", "25.5"], [26.5, "10", "7.5", "42", "26"],
];

const womenShoes: Array<[SystemCode, string, number, number]> = [
  ["MY", "UK 3", 21.9, 22.4], ["MY", "UK 3.5", 22.2, 22.7], ["MY", "UK 4", 22.9, 23.5], ["MY", "UK 4.5", 23.2, 23.8],
  ["MY", "UK 5", 23.5, 24.1], ["MY", "UK 5.5", 23.9, 24.5], ["MY", "UK 6", 24.2, 24.8], ["MY", "UK 6.5", 24.9, 25.5],
  ["MY", "UK 7", 25.5, 26.1], ["MY", "UK 7.5", 26.2, 26.8], ["MY", "UK 8", 26.3, 26.9],
  ...womenShoeAnchors.flatMap(([f, us, uk, eu, jp]): Array<[SystemCode, string, number, number]> => [
    ["US", `US ${us}`, r1(f - 0.3), r1(f + 0.3)],
    ["UK", `UK ${uk}`, r1(f - 0.3), r1(f + 0.3)],
    ["EU", `EU ${eu}`, r1(f - 0.3), r1(f + 0.3)],
    ["VN", `VN ${eu}`, r1(f - 0.3), r1(f + 0.3)],
    ["JP", `JP ${jp}`, r1(f - 0.3), r1(f + 0.3)],
    ["CN", `CN ${Math.round(f * 10)}`, r1(f - 0.3), r1(f + 0.3)],
    ["KR", `KR ${Math.round(f * 10)}`, r1(f - 0.25), r1(f + 0.25)],
  ]),
];

// ---------- CHILDREN ----------
// Canonical age ladder: chest/waist (cm), height approximations per system.
const kidLadder: Array<[string, number, number, number, number]> = [
  ["2Y", 52, 54, 50, 52], ["3Y", 54, 56, 51.5, 53], ["4Y", 56, 58, 53, 54.5], ["5Y", 58, 61, 54.5, 56.5],
  ["6Y", 61, 64, 56.5, 58.5], ["7Y", 64, 66, 58.5, 60], ["8Y", 66, 69, 60, 61.5], ["9Y", 69, 71, 61.5, 63],
  ["10Y", 71, 74, 63, 65], ["11Y", 74, 76, 65, 66.5], ["12Y", 76, 79, 66.5, 68], ["14Y", 79, 82, 68, 70], ["16Y", 82, 85, 70, 72],
];
const kidHeight: Record<string, number> = {
  "2Y": 92, "3Y": 98, "4Y": 104, "5Y": 110, "6Y": 116, "7Y": 122, "8Y": 128, "9Y": 134, "10Y": 140, "11Y": 146, "12Y": 152, "14Y": 158, "16Y": 164,
};
const kidMaps: Partial<Record<SystemCode, Record<string, string>>> = {
  US: { "2Y": "2T", "3Y": "3T", "4Y": "4T", "5Y": "5", "6Y": "6", "7Y": "6X-7", "8Y": "8", "10Y": "10", "12Y": "12", "14Y": "14", "16Y": "16" },
  UK: { "3Y": "2-3", "4Y": "3-4", "5Y": "4-5", "6Y": "5-6", "7Y": "6-7", "8Y": "7-8", "10Y": "9-10", "12Y": "11-12", "14Y": "13-14", "16Y": "15-16" },
  EU: { "2Y": "92", "3Y": "98", "4Y": "104", "5Y": "110", "6Y": "116", "7Y": "122", "8Y": "128", "9Y": "134", "10Y": "140", "11Y": "146", "12Y": "152", "14Y": "158", "16Y": "164" },
  JP: { "2Y": "90", "4Y": "100", "5Y": "110", "7Y": "120", "9Y": "130", "11Y": "140", "14Y": "150", "16Y": "160" },
  CN: { "2Y": "90", "4Y": "100", "5Y": "110", "7Y": "120", "9Y": "130", "11Y": "140", "14Y": "150", "16Y": "160" },
  KR: { "3Y": "3", "5Y": "5", "7Y": "7", "9Y": "9", "11Y": "11", "12Y": "13", "14Y": "15", "16Y": "17" },
};

const kidClothes: Array<[SystemCode, string, Category, number, number, string?]> = [];
for (const [age, cmn, cmx, wmn, wmx] of kidLadder) {
  kidClothes.push(["MY", age, "Shirts", cmn, cmx, `approx height ${kidHeight[age]} cm`]);
  kidClothes.push(["MY", age, "Pants", wmn, wmx]);
  kidClothes.push(["VN", `VN ${age}`, "Shirts", cmn, cmx]);
  kidClothes.push(["VN", `VN ${age}`, "Pants", wmn, wmx]);
}
for (const [system, map] of Object.entries(kidMaps) as Array<[SystemCode, Record<string, string>]>) {
  for (const [age, label] of Object.entries(map)) {
    const row = kidLadder.find(([a]) => a === age)!;
    kidClothes.push([system, `${system} ${label}`, "Shirts", row[1], row[2]]);
    kidClothes.push([system, `${system} ${label}`, "Pants", row[3], row[4]]);
  }
}

// (foot cm, US, UK, EU)
const kidShoeAnchors: Array<[number, string, string, string]> = [
  [12.1, "5C", "4", "20"], [13.0, "6C", "5", "22"], [14.0, "7C", "6", "23"], [14.6, "8C", "7", "24"], [15.6, "9C", "8", "25"],
  [16.5, "10C", "9", "27"], [17.1, "11C", "10", "28"], [18.1, "12C", "11", "30"], [19.1, "13C", "12", "31"],
  [19.7, "1Y", "13", "32"], [20.6, "2Y", "1", "33.5"], [21.6, "3Y", "2", "34.5"], [22.2, "4Y", "3", "36"],
  [23.2, "5Y", "4", "37"], [24.1, "6Y", "5", "38"], [24.8, "7Y", "6", "39"],
];
const kidShoes: Array<[SystemCode, string, number, number]> = [
  ...Array.from({ length: 28 }, (_, i): [SystemCode, string, number, number] => {
    const f = 11.5 + i * 0.5;
    return ["MY", `${f.toFixed(1)} cm`, r1(f - 0.25), r1(f + 0.25)];
  }),
  ...kidShoeAnchors.flatMap(([f, us, uk, eu]): Array<[SystemCode, string, number, number]> => [
    ["US", `US ${us}`, r1(f - 0.3), r1(f + 0.3)],
    ["UK", `UK ${uk}`, r1(f - 0.3), r1(f + 0.3)],
    ["EU", `EU ${eu}`, r1(f - 0.3), r1(f + 0.3)],
    ["VN", `VN ${eu}`, r1(f - 0.3), r1(f + 0.3)],
    ["CN", `CN ${eu}`, r1(f - 0.3), r1(f + 0.3)],
    ["JP", `JP ${f.toFixed(1)}`, r1(f - 0.3), r1(f + 0.3)],
    ["KR", `KR ${Math.round(f * 10)}`, r1(f - 0.25), r1(f + 0.25)],
  ]),
];

// ---------- ASSEMBLY ----------
function build(
  rows: Array<[SystemCode, string, Category, number, number, string?]>,
  gender: SizeGender,
): SizeChartEntry[] {
  return rows.map(([system, label, category, min, max, notes]) => ({
    system,
    category,
    label,
    audience: "Adults" as const,
    gender,
    notes,
    measurements: category === "Shoes"
      ? { footLength: { min, max } }
      : category === "Shirts"
        ? { chest: { min, max } }
        : { waist: { min, max } },
  }));
}

export const sizeChartEntries: SizeChartEntry[] = [
  ...build(menShirts.map(([s, l, mn, mx]) => [s, l, "Shirts", mn, mx] as [SystemCode, string, Category, number, number]), "Men"),
  ...build(menPants.map(([s, l, mn, mx]) => [s, l, "Pants", mn, mx] as [SystemCode, string, Category, number, number]), "Men"),
  ...build(menShoes.map(([s, l, mn, mx]) => [s, l, "Shoes", mn, mx] as [SystemCode, string, Category, number, number]), "Men"),
  ...build(womenShirts, "Women"),
  ...build(womenPants, "Women"),
  ...build(womenShoes.map(([s, l, mn, mx]) => [s, l, "Shoes", mn, mx] as [SystemCode, string, Category, number, number]), "Women"),
  ...kidClothes.map(([system, label, category, min, max, notes]) => ({
    system,
    category,
    label,
    audience: "Children" as const,
    notes,
    measurements: category === "Shirts"
      ? { chest: { min, max } }
      : { waist: { min, max } },
  })),
  ...kidShoes.map(([system, label, min, max]) => ({
    system,
    category: "Shoes" as const,
    label,
    audience: "Children" as const,
    measurements: { footLength: { min, max } },
  })),
];