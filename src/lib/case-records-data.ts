// Auto-generated from case_records.db (14,092 clinical case records, 2019-2025)
// by C:/Users/maxra/Documents/Wildlife Rescue/Data/Master Data/export_case_records_to_website.py
// DO NOT EDIT BY HAND - re-run the script to refresh.

export const CLINICAL_TOTAL_CASES = 14092;
export const CLINICAL_CASES_WITH_CONDITION = 13941;
export const CLINICAL_CASES_WITH_AGE = 14065;
export const CLINICAL_COVERAGE_PCT = 35.5;

export type ClinicalCondition = { name: string; cases: number };
export const CLINICAL_CONDITIONS: ClinicalCondition[] = [
  { name: "Manja Injuries", cases: 5916 },
  { name: "Septicemia / Infection", cases: 2326 },
  { name: "Fractures", cases: 2231 },
  { name: "Dehydration / Emaciation", cases: 1957 },
  { name: "External Examination Normal", cases: 1769 },
  { name: "Orphan / Chick-related", cases: 1495 },
  { name: "Metabolic Bone Disease", cases: 415 },
  { name: "Avian Pox", cases: 185 },
  { name: "Maggot Wound (Myiasis)", cases: 115 },
  { name: "Eye Injury", cases: 22 },
  { name: "Internal Issue / Toxicosis", cases: 18 },
  { name: "Dislocation / Joint Issue", cases: 14 },
  { name: "Methane Burn / Burn", cases: 13 },
];

export type ClinicalAge = { name: string; cases: number };
export const CLINICAL_AGES: ClinicalAge[] = [
  { name: "Adult", cases: 9253 },
  { name: "Nestling", cases: 1896 },
  { name: "Fledgling", cases: 1849 },
  { name: "Juvenile", cases: 911 },
  { name: "Hatchling", cases: 118 },
];

export type SpeciesOutcome = {
  species: string;
  n: number;
  released: number;
  died: number;
  transferred: number;
  releasedPct: number;
  diedPct: number;
};
export const SPECIES_OUTCOMES: SpeciesOutcome[] = [
  { species: "Black Kite", n: 11848, released: 9140, died: 2233, transferred: 4, releasedPct: 77.1, diedPct: 18.8 },
  { species: "Blue Rock Pigeon", n: 511, released: 29, died: 47, transferred: 429, releasedPct: 5.7, diedPct: 9.2 },
  { species: "Barn Owl", n: 385, released: 141, died: 222, transferred: 0, releasedPct: 36.6, diedPct: 57.7 },
  { species: "Black Eared Kite", n: 348, released: 262, died: 64, transferred: 0, releasedPct: 75.3, diedPct: 18.4 },
  { species: "Shikra", n: 184, released: 42, died: 137, transferred: 0, releasedPct: 22.8, diedPct: 74.5 },
  { species: "Cattle Egret", n: 131, released: 34, died: 88, transferred: 0, releasedPct: 26.0, diedPct: 67.2 },
  { species: "Spotted Owlet", n: 60, released: 21, died: 37, transferred: 0, releasedPct: 35.0, diedPct: 61.7 },
];

export type AgeOutcome = {
  cohort: string;
  n: number;
  released: number;
  died: number;
  transferred: number;
  releasedPct: number;
  diedPct: number;
};
export const AGE_OUTCOMES: AgeOutcome[] = [
  { cohort: "Adult", n: 9253, released: 6286, died: 2172, transferred: 251, releasedPct: 67.9, diedPct: 23.5 },
  { cohort: "Juvenile-stage", n: 4774, released: 3573, died: 961, transferred: 189, releasedPct: 74.8, diedPct: 20.1 },
];

export type YearOutcome = {
  year: number;
  n: number;
  released: number;
  died: number;
  releasedPct: number;
  diedPct: number;
};
export const YEARLY_OUTCOMES: YearOutcome[] = [
  { year: 2019, n: 2168, released: 1766, died: 359, releasedPct: 81.5, diedPct: 16.6 },
  { year: 2020, n: 2263, released: 1868, died: 364, releasedPct: 82.5, diedPct: 16.1 },
  { year: 2021, n: 887, released: 278, died: 173, releasedPct: 31.3, diedPct: 19.5 },
  { year: 2022, n: 2873, released: 2419, died: 266, releasedPct: 84.2, diedPct: 9.3 },
  { year: 2023, n: 2180, released: 1189, died: 832, releasedPct: 54.5, diedPct: 38.2 },
  { year: 2024, n: 2177, released: 1426, died: 671, releasedPct: 65.5, diedPct: 30.8 },
  { year: 2025, n: 1544, released: 961, died: 477, releasedPct: 62.2, diedPct: 30.9 },
];

// Primary conditions among juvenile-stage cases (out of 4,763 total juveniles).
// Cases can match multiple categories; not mutually exclusive.
export const JUVENILE_CONDITIONS: ClinicalCondition[] = [
  { name: "Dehydrated / Emaciated", cases: 1312 },
  { name: "Manja-pattern injuries", cases: 933 },
  { name: "Pure orphan / fallen", cases: 926 },
  { name: "Fractures", cases: 500 },
  { name: "Metabolic Bone Disease", cases: 381 },
  { name: "Septicemia / Infection", cases: 217 },
];
