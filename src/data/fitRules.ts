import type { Fit } from "../library/types";

export interface FitInput {
    heightCm?: number;
    weightKg?: number;
    tightAreas?: Array<"Collar" | "Chest" | "Thigh" | "Waist" | "Sleeves">;
    preference?: "Slimmer" | "Balanced" | "Roomier";
}

export function recommendFit(input: FitInput): { fit: Fit; notes: string[] } {
    const notes: string[] = [];

    if (input.tightAreas?.includes("Thigh") || input.tightAreas?.includes("Waist")) {
        notes.push("If slim fit pants feel tight at the top, choose Modern/Regular or an athletic taper.");
    }
    if (input.tightAreas?.includes("Collar") || input.tightAreas?.includes("Chest")) {
        notes.push("For slim fit shirts, consider sizing up if collar/chest feels tight.");
    }

    const fit: Fit =
        input.preference === "Slimmer" ? "Modern" :
            input.preference === "Roomier" ? "Loose" :
                "Regular";

    return { fit, notes };
}