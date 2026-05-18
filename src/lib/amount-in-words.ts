/**
 * Convert an integer rupee amount to Indian-numbering words.
 *
 *   amountInWords(500)        → "Five Hundred Rupees Only"
 *   amountInWords(1500)       → "One Thousand Five Hundred Rupees Only"
 *   amountInWords(125000)     → "One Lakh Twenty Five Thousand Rupees Only"
 *   amountInWords(10000000)   → "One Crore Rupees Only"
 *
 * Used on the provisional 80(G) receipt PDF — Indian income-tax receipts
 * conventionally show both the figure and the words ("Rs. 500/- (Rupees Five
 * Hundred Only)"). Donations are always whole rupees (paise are stripped by
 * the caller).
 */

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? TENS[t] : `${TENS[t]} ${ONES[o]}`;
}

function threeDigits(n: number): string {
  if (n < 100) return twoDigits(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const hundred = `${ONES[h]} Hundred`;
  return rest === 0 ? hundred : `${hundred} ${twoDigits(rest)}`;
}

export function amountInWords(rupees: number): string {
  if (!Number.isFinite(rupees) || rupees < 0) return "Zero Rupees Only";
  const n = Math.floor(rupees);
  if (n === 0) return "Zero Rupees Only";

  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = n % 1000;

  const parts: string[] = [];
  if (crore > 0) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh > 0) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${twoDigits(thousand)} Thousand`);
  if (hundred > 0) parts.push(threeDigits(hundred));

  return `${parts.join(" ")} Rupees Only`;
}
