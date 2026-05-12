"use client";

import { useState } from "react";

interface Bucket {
  category: string;
  amount: string;
  percentage: string;
  color: string;
}

interface YearData {
  fy: string;
  total: string;
  buckets: Bucket[];
}

// Per-year expenditure breakdown sourced from each Income & Expenditure A/c.
// Percentages are share of that year's Total Expenditure.
//
// "Rescue & Medical Expenses" merges six audited line items:
//   Food for Birds + Medicine for Birds + Rescue & Release Logistics
//   + Clinic Rent + Ambulance/Vehicle Maintenance + Service Charges
// (For FY 2020-21 there are no separate Ambulance Maintenance / Service
// Charges lines in the audited statement, so the bucket reflects the
// other four items only.)
const YEARLY: YearData[] = [
  {
    fy: "FY 2024-25",
    total: "₹42,44,343",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹22,82,060", percentage: "53.8%", color: "bg-teal" },
      { category: "Rescue & Medical Expenses",    amount: "₹6,88,886",  percentage: "16.2%", color: "bg-amber" },
      { category: "Other Operating Expenses",     amount: "₹12,73,397", percentage: "30.0%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2023-24",
    total: "₹29,39,721",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹18,33,932", percentage: "62.4%", color: "bg-teal" },
      { category: "Rescue & Medical Expenses",    amount: "₹6,52,467",  percentage: "22.2%", color: "bg-amber" },
      { category: "Other Operating Expenses",     amount: "₹4,53,322",  percentage: "15.4%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2022-23",
    total: "₹26,11,711",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹12,26,778", percentage: "47.0%", color: "bg-teal" },
      { category: "Rescue & Medical Expenses",    amount: "₹6,09,330",  percentage: "23.3%", color: "bg-amber" },
      { category: "Other Operating Expenses",     amount: "₹7,75,603",  percentage: "29.7%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2021-22",
    total: "₹21,16,945",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹10,26,576", percentage: "48.5%", color: "bg-teal" },
      { category: "Rescue & Medical Expenses",    amount: "₹6,78,193",  percentage: "32.0%", color: "bg-amber" },
      { category: "Other Operating Expenses",     amount: "₹4,12,175",  percentage: "19.5%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2020-21",
    total: "₹18,79,862",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹6,24,896",  percentage: "33.2%", color: "bg-teal" },
      { category: "Rescue & Medical Expenses",    amount: "₹5,87,778",  percentage: "31.3%", color: "bg-amber" },
      { category: "Other Operating Expenses",     amount: "₹6,67,188",  percentage: "35.5%", color: "bg-slate" },
    ],
  },
];

export default function YearlyExpenditureBreakdown() {
  const [selectedFy, setSelectedFy] = useState(YEARLY[0].fy);
  const data = YEARLY.find((y) => y.fy === selectedFy) ?? YEARLY[0];

  return (
    <>
      {/* Year tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {YEARLY.map((y) => {
          const active = y.fy === selectedFy;
          return (
            <button
              key={y.fy}
              onClick={() => setSelectedFy(y.fy)}
              className={
                "px-4 py-2 rounded-lg text-sm font-semibold transition-colors " +
                (active
                  ? "bg-teal-dark text-white"
                  : "bg-white text-teal-dark border border-gray-200 hover:border-teal-dark hover:bg-teal-light")
              }
            >
              {y.fy}
            </button>
          );
        })}
      </div>

      {/* Year total */}
      <p className="text-center text-sm text-slate mb-8">
        Total Expenditure ({data.fy}):{" "}
        <span className="font-semibold text-teal-dark">{data.total}</span>
      </p>

      {/* Bucket bars */}
      <div className="max-w-2xl mx-auto space-y-4">
        {data.buckets.map((item) => (
          <div
            key={item.category}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2 gap-2">
              <span className="text-sm font-semibold text-charcoal">
                {item.category}
              </span>
              <span className="text-sm text-slate font-mono whitespace-nowrap">
                {item.amount} ({item.percentage})
              </span>
            </div>
            <div className="w-full bg-offwhite rounded-full h-3">
              <div
                className={`h-full ${item.color} rounded-full`}
                style={{ width: item.percentage }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
