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
const YEARLY: YearData[] = [
  {
    fy: "FY 2024-25",
    total: "₹42,44,343",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹22,82,060", percentage: "53.8%", color: "bg-teal" },
      { category: "Food for Birds",               amount: "₹2,00,903",  percentage: "4.7%",  color: "bg-amber" },
      { category: "Rescue & Release Logistics",   amount: "₹1,28,209",  percentage: "3.0%",  color: "bg-success" },
      { category: "Medicine for Birds",           amount: "₹63,044",    percentage: "1.5%",  color: "bg-danger" },
      { category: "Other Operating Expenses",     amount: "₹15,70,127", percentage: "37.0%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2023-24",
    total: "₹29,39,721",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹18,33,932", percentage: "62.4%", color: "bg-teal" },
      { category: "Food for Birds",               amount: "₹1,88,616",  percentage: "6.4%",  color: "bg-amber" },
      { category: "Rescue & Release Logistics",   amount: "₹1,14,477",  percentage: "3.9%",  color: "bg-success" },
      { category: "Medicine for Birds",           amount: "₹41,772",    percentage: "1.4%",  color: "bg-danger" },
      { category: "Other Operating Expenses",     amount: "₹7,60,924",  percentage: "25.9%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2022-23",
    total: "₹26,11,711",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹12,26,778", percentage: "47.0%", color: "bg-teal" },
      { category: "Food for Birds",               amount: "₹1,90,684",  percentage: "7.3%",  color: "bg-amber" },
      { category: "Rescue & Release Logistics",   amount: "₹1,03,667",  percentage: "4.0%",  color: "bg-success" },
      { category: "Medicine for Birds",           amount: "₹29,244",    percentage: "1.1%",  color: "bg-danger" },
      { category: "Other Operating Expenses",     amount: "₹10,61,338", percentage: "40.6%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2021-22",
    total: "₹21,16,945",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹10,26,576", percentage: "48.5%", color: "bg-teal" },
      { category: "Food for Birds",               amount: "₹2,81,087",  percentage: "13.3%", color: "bg-amber" },
      { category: "Rescue & Release Logistics",   amount: "₹78,116",    percentage: "3.7%",  color: "bg-success" },
      { category: "Medicine for Birds",           amount: "₹47,530",    percentage: "2.2%",  color: "bg-danger" },
      { category: "Other Operating Expenses",     amount: "₹6,83,635",  percentage: "32.3%", color: "bg-slate" },
    ],
  },
  {
    fy: "FY 2020-21",
    total: "₹18,79,862",
    buckets: [
      { category: "Salaries, Wages & Honorarium", amount: "₹6,24,896",  percentage: "33.2%", color: "bg-teal" },
      { category: "Food for Birds",               amount: "₹3,56,057",  percentage: "18.9%", color: "bg-amber" },
      { category: "Rescue & Release Logistics",   amount: "₹57,636",    percentage: "3.1%",  color: "bg-success" },
      { category: "Medicine for Birds",           amount: "₹94,085",    percentage: "5.0%",  color: "bg-danger" },
      { category: "Other Operating Expenses",     amount: "₹7,47,188",  percentage: "39.7%", color: "bg-slate" },
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
