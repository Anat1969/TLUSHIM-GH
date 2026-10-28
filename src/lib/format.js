export const fmt = (n) => Math.round(n).toLocaleString("he-IL");
export const fmtD = (n) => n.toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const pct = (part, whole) => Math.round((part / whole) * 100);

export const sumPension = (p) =>
  p.deducted.pension.kehesh + p.deducted.pension.migdal + p.deducted.pension.mivtachim + p.deducted.pension.menora + p.deducted.pension.insurance;
export const sumMandatory = (p) =>
  p.deducted.mandatory.tax + p.deducted.mandatory.bituahLeumi + p.deducted.mandatory.bituahBriut;
export const sumEmployer = (p) =>
  p.employer.kehesh + p.employer.migdal + p.employer.mivtachim + p.employer.mivtachimPiz + p.employer.menora + p.employer.menoraPiz;

// פירוק הברוטו ליעדים, לחודש נתון. משמש בדף הבית ובסקירה.
export const segmentsOf = (p) => [
  { key: "net", label: "נטו לבנק", val: p.net, color: "var(--bank)", hex: "#1D9E75" },
  { key: "tax", label: "מס הכנסה", val: p.deducted.mandatory.tax, color: "var(--cut)", hex: "#A32D2D" },
  { key: "bl", label: "ביטוח לאומי", val: p.deducted.mandatory.bituahLeumi, color: "var(--rust)", hex: "#D85A30" },
  { key: "bb", label: "ביטוח בריאות", val: p.deducted.mandatory.bituahBriut, color: "var(--ochre)", hex: "#BA7517" },
  { key: "pension", label: "קופות פנסיה", val: sumPension(p), color: "var(--employer)", hex: "#534AB7" },
];
