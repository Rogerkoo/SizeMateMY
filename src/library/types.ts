export type Category = "Shoes" | "Shirts" | "Pants";
export type SizeAudience = "Adults" | "Children";
export type SystemCode = "MY" | "US" | "UK" | "EU" | "VN" | "JP" | "CN" | "KR";
export type Fit = "Slim" | "Modern" | "Regular" | "Loose";

export interface MeasurementRange {
  min: number; // cm
  max: number; // cm
}

export interface SizeChartEntry {
  audience?: SizeAudience;
  system: SystemCode;
  category: Category;
  label: string;
  measurements: {
    footLength?: MeasurementRange;
    chest?: MeasurementRange;
    waist?: MeasurementRange;
    hip?: MeasurementRange;
    inseam?: MeasurementRange;
    thigh?: MeasurementRange;
    shoulder?: MeasurementRange;
    length?: MeasurementRange;
    collar?: MeasurementRange;
  };
  notes?: string;
}

export interface ConversionResult {
  input: { system: SystemCode; label: string };
  matches: Array<{
    system: SystemCode;
    label: string;
    confidence: "High" | "Medium" | "Low";
    reason: string;
  }>;
  primaryMeasurement: {
    name: string;
    range: MeasurementRange;
  };
}