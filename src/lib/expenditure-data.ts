// Where Your Money Goes — expenditure breakdown by financial year.
// Source: Audited consolidated financial statements (A. Rehman & Associates, CAs)
// FY 2020-21 & FY 2021-22 figures reconstructed from the audited I&E A/c.
// FY 2022-23, 2023-24, 2024-25 totals from the 5-year consolidated summary;
// detailed line-item breakdowns pending typed-up source data.

export const INR_PER_USD = 84.5;

export type SubItem = {
  name: string;
  amount: number;
};

export type ExpenditureHead = {
  name: string;
  amount: number;
  color: string;
  subItems?: SubItem[];
};

export type YearExpenditure = {
  fy: string; // "2024-25"
  label: string; // "FY 2024-25"
  totalIncome: number;
  totalExpenditure: number;
  surplus: number;
  capex?: number; // Major equipment / fixed-asset investment
  heads?: ExpenditureHead[]; // omit when detailed breakdown isn't published yet
};

export const EXPENDITURE_BY_YEAR: YearExpenditure[] = [
  {
    fy: "2024-25",
    label: "FY 2024-25",
    totalIncome: 4266647,
    totalExpenditure: 3844343,
    surplus: 422304,
    capex: 1270749, // Ambulance ₹10.15L, Anaesthesia Machine ₹1.41L, Oxygen Concentrator ₹57K, other clinic equipment
    heads: [
      {
        name: "Wages, Salaries & Honorarium",
        amount: 2288060,
        color: "bg-teal",
        subItems: [
          { name: "Salaries", amount: 1027332 },
          { name: "Honorarium", amount: 906000 },
          { name: "Wages", amount: 354728 },
        ],
      },
      {
        name: "Food for Birds",
        amount: 200903,
        color: "bg-amber",
      },
      {
        name: "Rescue & Release Logistics",
        amount: 128208,
        color: "bg-success",
      },
      {
        name: "Medicine, Service Charges & Direct Hospital Expenses",
        amount: 366094,
        color: "bg-danger",
        subItems: [
          { name: "Medicine for Birds", amount: 63044 },
          { name: "Service Charges (Hospital)", amount: 37970 },
          { name: "Clinic Rent", amount: 240000 },
          { name: "Clinic Hardware", amount: 6320 },
          { name: "Ambulance Maintenance", amount: 18760 },
        ],
      },
      {
        name: "Other Operational Expenses",
        amount: 861078,
        color: "bg-slate",
        subItems: [
          { name: "Audit & Professional Fees", amount: 35000 },
          { name: "Office & Utilities (electricity, phone, bank, postage, printing, insurance, advertisement, accounting)", amount: 308774 },
          { name: "Repair & Maintenance", amount: 55190 },
          { name: "Staff Welfare & Travel (hospitality, welfare, conveyance, tour, RD Parade activity)", amount: 169616 },
          { name: "Depreciation & Miscellaneous", amount: 292498 },
        ],
      },
    ],
  },
  {
    fy: "2023-24",
    label: "FY 2023-24",
    totalIncome: 3008132,
    totalExpenditure: 2939721,
    surplus: 68411,
    capex: 217110, // Printer, Deep Freezer, Microphone, Camera, CCTV, Attendance Machine, Tea Dispenser, etc.
    heads: [
      {
        name: "Wages, Salaries & Honorarium",
        amount: 1833952,
        color: "bg-teal",
      },
      {
        name: "Food for Birds",
        amount: 148616,
        color: "bg-amber",
      },
      {
        name: "Rescue & Release Logistics",
        amount: 114877,
        color: "bg-success",
      },
      {
        name: "Medicine, Service Charges & Direct Hospital Expenses",
        amount: 366797,
        color: "bg-danger",
        subItems: [
          { name: "Medicine for Birds", amount: 61772 },
          { name: "Service Charges (Hospital)", amount: 37065 },
          { name: "Clinic Rent", amount: 264000 },
          { name: "Clinic Hardware", amount: 3960 },
        ],
      },
      {
        name: "Other Operational Expenses",
        amount: 475479,
        color: "bg-slate",
        subItems: [
          { name: "Audit & Professional Fees", amount: 30000 },
          { name: "Office & Utilities (electricity, phone, bank, postage, printing, advertisement)", amount: 135624 },
          { name: "Repair & Vehicle Maintenance", amount: 63457 },
          { name: "Staff Welfare & Travel (hospitality, welfare, conveyance, tour)", amount: 48643 },
          { name: "Depreciation & Miscellaneous", amount: 197756 },
        ],
      },
    ],
  },
  {
    fy: "2022-23",
    label: "FY 2022-23",
    totalIncome: 3106297,
    totalExpenditure: 2805707,
    surplus: 300591,
    capex: 80160, // Tools + Computer & Hardware capitalized on Balance Sheet
    heads: [
      {
        name: "Wages, Salaries & Honorarium",
        amount: 1183688,
        color: "bg-teal",
      },
      {
        name: "Food for Birds",
        amount: 196644,
        color: "bg-amber",
      },
      {
        name: "Rescue & Release Logistics",
        amount: 103667,
        color: "bg-success",
      },
      {
        name: "Medicine, Service Charges & Direct Hospital Expenses",
        amount: 387729,
        color: "bg-danger",
        subItems: [
          { name: "Medicine for Birds", amount: 29244 },
          { name: "Service Charges (Hospital)", amount: 32535 },
          { name: "Clinic Rent", amount: 246000 },
          { name: "Clinic Equipments", amount: 50150 },
          { name: "Refrigerator for Clinic", amount: 29800 },
        ],
      },
      {
        name: "Other Operational Expenses",
        amount: 933978,
        color: "bg-slate",
        subItems: [
          { name: "Audit & Professional Fees", amount: 32500 },
          { name: "Office & Utilities (electricity, phone, insurance, bank, stationery, postage)", amount: 100174 },
          { name: "Repair & Vehicle Maintenance", amount: 34705 },
          { name: "Staff Welfare & Travel (incl. ₹3.13L tour expense)", amount: 376042 },
          { name: "Depreciation & Miscellaneous (incl. one-time computer hardware ₹2.19L)", amount: 390557 },
        ],
      },
    ],
  },
  {
    fy: "2021-22",
    label: "FY 2021-22",
    totalIncome: 2272105,
    totalExpenditure: 2116925,
    surplus: 155180,
    capex: 33900,
    heads: [
      {
        name: "Wages, Salaries & Honorarium",
        amount: 1026576,
        color: "bg-teal",
      },
      {
        name: "Food for Birds",
        amount: 281087,
        color: "bg-amber",
      },
      {
        name: "Rescue & Release Logistics",
        amount: 78116,
        color: "bg-success",
      },
      {
        name: "Medicine, Service Charges & Direct Hospital Expenses",
        amount: 77530,
        color: "bg-danger",
        subItems: [
          { name: "Medicine for Birds", amount: 47530 },
          { name: "Service Charges (Hospital)", amount: 30000 },
        ],
      },
      {
        name: "Other Operational Expenses",
        amount: 619716,
        color: "bg-slate",
        subItems: [
          { name: "Audit & Professional Fees", amount: 36000 },
          { name: "Office & Utilities (rent ₹2.40L, electricity, phone, bank, insurance, printing, postage, accounting, data entry)", amount: 344434 },
          { name: "Repair & Vehicle Maintenance", amount: 26090 },
          { name: "Staff Welfare & Travel (hospitality, welfare, tour)", amount: 102786 },
          { name: "Depreciation & Miscellaneous", amount: 110405 },
        ],
      },
    ],
  },
  {
    fy: "2020-21",
    label: "FY 2020-21",
    totalIncome: 2117859,
    totalExpenditure: 1879862,
    surplus: 231997,
    capex: 280435,
    heads: [
      {
        name: "Wages, Salaries & Honorarium",
        amount: 824896,
        color: "bg-teal",
      },
      {
        name: "Food for Birds",
        amount: 356057,
        color: "bg-amber",
      },
      {
        name: "Rescue & Release Logistics",
        amount: 57636,
        color: "bg-success",
      },
      {
        name: "Medicine, Service Charges & Direct Hospital Expenses",
        amount: 94085,
        color: "bg-danger",
        subItems: [
          { name: "Medicine for Birds", amount: 94085 },
        ],
      },
      {
        name: "Other Operational Expenses",
        amount: 266753,
        color: "bg-slate",
        subItems: [
          { name: "Audit & Professional Fees", amount: 29500 },
          { name: "Office & Utilities (rent, power, phone, insurance, bank, stationery, postage, accounting)", amount: 156761 },
          { name: "Repair & Vehicle Maintenance", amount: 26000 },
          { name: "Staff Welfare & Travel (hospitality, conveyance)", amount: 8115 },
          { name: "Depreciation & Miscellaneous", amount: 46377 },
        ],
      },
    ],
  },
];

export function formatINR(amount: number): string {
  // Indian numbering: 12,34,567 (lakh/crore grouping)
  const rounded = Math.round(amount);
  const s = rounded.toString();
  if (s.length <= 3) return `₹${s}`;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formattedRest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${formattedRest},${last3}`;
}

export function formatUSD(amount: number): string {
  const usd = Math.round(amount / INR_PER_USD);
  return `~US$ ${usd.toLocaleString("en-US")}`;
}
