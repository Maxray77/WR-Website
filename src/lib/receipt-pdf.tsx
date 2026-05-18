import path from "path";
import { Document, Page, View, Text, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { DonationRecord } from "./donations";
import { amountInWords } from "./amount-in-words";

/**
 * Provisional 80(G) donation receipt PDF.
 *
 * Issued at payment.captured time. Stage 1 of the two-stage compliance flow:
 *   - Stage 1 (this): provisional receipt — sent immediately to donor by email.
 *   - Stage 2 (post-FY): Form 10BE certificate — issued after annual Form 10BD
 *     filing with the IT Dept (typically Apr–Jun following the FY close).
 *
 * Wildlife Rescue compliance IDs:
 *   - 80(G) Reg No: AAATW2352B25DL02 (valid AY 2027-28 – 2031-32)
 *   - PAN: AAATW2352B
 *
 * IMPORTANT — placeholder defaults that should be reviewed with the CA before
 * the first real donor receives a receipt:
 *   - Signatory name + role: currently "Mohammad Saud, Trustee" (typed only;
 *     no signature image yet). Drop a 200×80 PNG at `public/signature.png`
 *     and update `SIGNATURE_IMAGE_PATH` below to wire it up.
 *   - Statutory disclaimer wording: paraphrased from CBDT Form 10BE template;
 *     CA should confirm the exact phrasing required.
 *   - Address block: registered office is used (Ajmeri Gate). Operational
 *     address (Wazirabad) appears as a footer line.
 */

// ─── Static org details ────────────────────────────────────────────────────

const ORG = {
  name: "Wildlife Rescue",
  registeredOffice: "2970, Shah Ganj, Ajmeri Gate, Delhi - 110006, India",
  operationsAddress: "C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village, Delhi - 110084",
  phone: "+91 98100 29698",
  email: "nadeem@raptorrescue.org",
  website: "www.raptorrescue.org",
  pan: "AAATW2352B",
  reg80g: "AAATW2352B25DL02",
  validity80g: "AY 2027-28 to AY 2031-32",
  registrationType: "Registered Public Charitable Trust (Indian Trusts Act, 1882)",
  trustRegDate: "10 March 2010",
};

const SIGNATORY = {
  name: "Mohammad Saud",
  role: "Trustee",
};

// Optional signature image — drop a 200×80 PNG at this path to enable.
// react-pdf will silently skip the <Image /> if the path doesn't exist? No —
// it will throw. So we check existence at render time below.
const SIGNATURE_IMAGE_PATH = path.join(process.cwd(), "public", "signature.png");
const LOGO_PATH = path.join(process.cwd(), "public", "logo-receipt.png");

// ─── Styles ─────────────────────────────────────────────────────────────────

const COLORS = {
  teal: "#0A6E5C",
  tealDark: "#064E41",
  tealLight: "#E8F5F1",
  amber: "#E8A317",
  charcoal: "#1A1A2E",
  slate: "#6B7280",
  border: "#D1D5DB",
  offwhite: "#F9FAFB",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    paddingTop: 28,
    paddingBottom: 40,
    paddingHorizontal: 36,
    color: COLORS.charcoal,
    lineHeight: 1.35,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.teal,
    paddingBottom: 8,
  },
  logo: {
    width: 52,
    height: 46,
    objectFit: "contain",
  },
  orgBlock: {
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: 340,
  },
  orgName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.teal,
    marginBottom: 2,
  },
  orgTagline: {
    fontSize: 8,
    color: COLORS.slate,
    marginBottom: 4,
    fontStyle: "italic",
  },
  orgMeta: {
    fontSize: 8,
    color: COLORS.slate,
    textAlign: "right",
  },
  // Title bar
  titleBar: {
    backgroundColor: COLORS.tealLight,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.tealDark,
  },
  titleSub: {
    fontSize: 7.5,
    color: COLORS.slate,
    marginTop: 2,
  },
  receiptMeta: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  receiptLabel: {
    fontSize: 7,
    color: COLORS.slate,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  receiptNumber: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.charcoal,
  },
  receiptDate: {
    fontSize: 8.5,
    color: COLORS.charcoal,
    marginTop: 1,
  },
  // Sections
  section: {
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.tealDark,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  // Two-column key/value rows
  kvRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  kvLabel: {
    width: 120,
    fontSize: 8.5,
    color: COLORS.slate,
  },
  kvValue: {
    flex: 1,
    fontSize: 9.5,
    color: COLORS.charcoal,
  },
  kvValueBold: {
    flex: 1,
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.charcoal,
  },
  // Amount card
  amountCard: {
    backgroundColor: COLORS.offwhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
  amountFigures: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.teal,
    marginBottom: 2,
  },
  amountWords: {
    fontSize: 9.5,
    color: COLORS.charcoal,
    fontStyle: "italic",
  },
  // Disclaimer
  disclaimer: {
    fontSize: 7.5,
    color: COLORS.slate,
    lineHeight: 1.4,
    marginTop: 6,
    padding: 6,
    backgroundColor: COLORS.offwhite,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.amber,
  },
  // Signature
  signatureRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
  },
  signatureBox: {
    width: 180,
    alignItems: "center",
  },
  signatureImage: {
    width: 110,
    height: 36,
    marginBottom: 3,
    objectFit: "contain",
  },
  signatureLine: {
    width: 150,
    height: 0.7,
    backgroundColor: COLORS.charcoal,
    marginBottom: 3,
    marginTop: 18,
  },
  signatureName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.charcoal,
  },
  signatureRole: {
    fontSize: 8,
    color: COLORS.slate,
  },
  signatureOrg: {
    fontSize: 8,
    color: COLORS.slate,
    marginTop: 1,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },
  footerLeft: {
    fontSize: 7,
    color: COLORS.slate,
  },
  footerRight: {
    fontSize: 7,
    color: COLORS.slate,
    textAlign: "right",
  },
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function formatINR(paise: number): string {
  const rupees = paise / 100;
  return `₹ ${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function maskPanForDisplay(pan: string): string {
  // PAN is sensitive — show first 5 + last 1, mask middle
  if (pan.length !== 10) return pan;
  return `${pan.slice(0, 5)}XXXX${pan.slice(9)}`;
}

let signatureImageExists: boolean | null = null;
function hasSignatureImage(): boolean {
  if (signatureImageExists !== null) return signatureImageExists;
  try {
    // dynamic require avoids bundling fs in edge; this module is server-only anyway
    const fs = require("fs") as typeof import("fs");
    signatureImageExists = fs.existsSync(SIGNATURE_IMAGE_PATH);
  } catch {
    signatureImageExists = false;
  }
  return signatureImageExists;
}

// ─── Document component ────────────────────────────────────────────────────

interface ReceiptProps {
  record: DonationRecord;
  /**
   * Pass the donor's PAN here. The DonationRecord stores PAN encrypted, so the
   * caller is responsible for decrypting it before passing in. If undefined,
   * the receipt prints "Not provided" — but this should not happen for 80G
   * receipts (validation requires PAN on the 80G path).
   */
  pan?: string;
}

function ReceiptDocument({ record, pan }: ReceiptProps) {
  const { donor, amount, capturedAt, receiptNumber, paymentId, fy } = record;
  const rupees = amount / 100;
  const displayPan = pan ? maskPanForDisplay(pan) : pan === "" ? "Not provided" : "On file (encrypted)";
  const showSignatureImage = hasSignatureImage();

  return (
    <Document
      title={`Donation Receipt ${receiptNumber}`}
      author={ORG.name}
      subject="80(G) Provisional Donation Receipt"
      keywords="donation, 80G, receipt, wildlife rescue, tax exempt"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={LOGO_PATH} style={styles.logo} />
          <View style={styles.orgBlock}>
            <Text style={styles.orgName}>{ORG.name}</Text>
            <Text style={styles.orgTagline}>The world's largest raptor rescue facility</Text>
            <Text style={styles.orgMeta}>{ORG.registeredOffice}</Text>
            <Text style={styles.orgMeta}>
              {ORG.phone}  •  {ORG.email}  •  {ORG.website}
            </Text>
          </View>
        </View>

        {/* Title bar */}
        <View style={styles.titleBar}>
          <View>
            <Text style={styles.titleText}>PROVISIONAL DONATION RECEIPT</Text>
            <Text style={styles.titleSub}>Issued under Section 80(G) of the Income-tax Act, 1961</Text>
          </View>
          <View style={styles.receiptMeta}>
            <Text style={styles.receiptLabel}>Receipt No.</Text>
            <Text style={styles.receiptNumber}>{receiptNumber}</Text>
            <Text style={styles.receiptDate}>Dated: {formatDate(capturedAt)}</Text>
          </View>
        </View>

        {/* Donor details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Donor Details</Text>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Name</Text>
            <Text style={styles.kvValueBold}>{donor.name}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>PAN</Text>
            <Text style={styles.kvValue}>{displayPan}</Text>
          </View>
          {donor.addressLine1 && (
            <View style={styles.kvRow}>
              <Text style={styles.kvLabel}>Address</Text>
              <Text style={styles.kvValue}>
                {donor.addressLine1}
                {donor.city ? `, ${donor.city}` : ""}
                {donor.state ? `, ${donor.state}` : ""}
                {donor.pincode ? ` - ${donor.pincode}` : ""}
                {donor.country && donor.country !== "India" ? `, ${donor.country}` : ""}
              </Text>
            </View>
          )}
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Email</Text>
            <Text style={styles.kvValue}>{donor.email}</Text>
          </View>
          {donor.phone && (
            <View style={styles.kvRow}>
              <Text style={styles.kvLabel}>Phone</Text>
              <Text style={styles.kvValue}>{donor.phone}</Text>
            </View>
          )}
        </View>

        {/* Donation details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Donation Details</Text>
          <View style={styles.amountCard}>
            <Text style={styles.amountFigures}>{formatINR(amount)}</Text>
            <Text style={styles.amountWords}>({amountInWords(rupees)})</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Mode of Payment</Text>
            <Text style={styles.kvValue}>Online — Razorpay (Cards / UPI / Netbanking)</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Date Received</Text>
            <Text style={styles.kvValue}>{formatDate(capturedAt)}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Razorpay Payment ID</Text>
            <Text style={styles.kvValue}>{paymentId}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Financial Year</Text>
            <Text style={styles.kvValue}>FY {fy} (Assessment Year {nextAY(fy)})</Text>
          </View>
        </View>

        {/* Tax compliance */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Tax Exemption Details</Text>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Registration Type</Text>
            <Text style={styles.kvValue}>{ORG.registrationType}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Trust Registered</Text>
            <Text style={styles.kvValue}>{ORG.trustRegDate}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>PAN of Trust</Text>
            <Text style={styles.kvValueBold}>{ORG.pan}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>80(G) Reg. No.</Text>
            <Text style={styles.kvValueBold}>{ORG.reg80g}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>80(G) Validity</Text>
            <Text style={styles.kvValue}>{ORG.validity80g}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvLabel}>Section Code</Text>
            <Text style={styles.kvValue}>80G(5)(iv) — Deduction at 50% of the donated amount</Text>
          </View>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          This is a PROVISIONAL receipt. The statutory Form 10BE tax-deduction certificate will be issued after
          Wildlife Rescue files Form 10BD with the Income-tax Department for the financial year above (typically
          by 31 May of the following year) — please retain that for income-tax filing. Deduction under Section
          80(G) is available subject to the conditions and limits prescribed under the Income-tax Act, 1961,
          including the aggregate ceiling of 10% of adjusted gross total income. This receipt is
          computer-generated and is valid without a physical seal. For queries, write to nadeem@raptorrescue.org
          quoting the receipt number above.
        </Text>

        {/* Signature */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            {showSignatureImage ? (
              <Image src={SIGNATURE_IMAGE_PATH} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureLine} />
            )}
            <Text style={styles.signatureName}>{SIGNATORY.name}</Text>
            <Text style={styles.signatureRole}>{SIGNATORY.role}</Text>
            <Text style={styles.signatureOrg}>For Wildlife Rescue</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            Operations: {ORG.operationsAddress}
          </Text>
          <Text style={styles.footerRight}>
            Receipt {receiptNumber}  •  Generated {new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

/**
 * Compute the Assessment Year for a given FY string.
 * FY 2026-27 → AY 2027-28
 */
function nextAY(fy: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(fy);
  if (!m) return fy;
  const startYear = parseInt(m[1], 10) + 1;
  const endYear = (startYear + 1) % 100;
  return `${startYear}-${endYear.toString().padStart(2, "0")}`;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Render the receipt PDF to a Node Buffer. Safe to call from API routes /
 * webhook handlers. Synchronous-looking but actually async because PDF
 * rendering involves font loading.
 */
export async function renderReceiptPdf(record: DonationRecord, pan?: string): Promise<Buffer> {
  return renderToBuffer(<ReceiptDocument record={record} pan={pan} />);
}
