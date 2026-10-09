export type Unit = "cm" | "in";

export function cmToIn(cm: number): number {
    return cm / 2.54;
}

export function formatRange(minCm: number, maxCm: number, unit: Unit): string {
    const convert = (v: number) => (unit === "cm" ? v : cmToIn(v));
    const min = convert(minCm);
    const max = convert(maxCm);

    // 1 decimal for cm, 1 decimal for inches (you can change to 2 decimals if you prefer)
    return `${min.toFixed(1)}–${max.toFixed(1)} ${unit}`;
}

export function prettyMeasurementName(key: string): string {
    switch (key) {
        case "footLength": return "Foot length";
        case "chest": return "Chest";
        case "waist": return "Waist";
        case "hip": return "Hip";
        case "inseam": return "Inseam";
        case "thigh": return "Thigh";
        case "shoulder": return "Shoulder";
        case "length": return "Length";
        case "collar": return "Collar";
        default: return key;
    }
}