import { useState, useMemo } from "react";

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי"];

const PAYSLIPS = [
  {
    month: "ינואר", year: 2026,
    config: { base: 27259, grade: "765/292", position: "אדריכל העיר", type: "חוזה בכירים", fullTime: 173.333, seniority: "2.0 שנים" },
    received: { base: 27259, eshel: 809.25, phone: 117, extras: 0, extrasLabel: "", diffs: 0 },
    calculated: { pensionFix: -327.11, grossBase: 26931.89, gross: 27858.14, carBenefit: 3810, rtn: 21, vaadBenefit: 182 },
    deducted: {
      mandatory: { tax: 6383, bituahLeumi: 1830.79, bituahBriut: 1541.80 },
      pension: { kehesh: 673.30, migdal: 64.84, mivtachim: 1491.98, menora: 416.15, insurance: 33 }
    },
    employer: { kehesh: 2019.89, migdal: 46.31, mivtachim: 1598.55, mivtachimPiz: 1775.46, menora: 445.88, menoraPiz: 495.22 },
    net: 15423.28,
    leave: { vacation: { open: 12.22, used: 14.67, added: 20, close: 18.89 }, sick: { open: 343.50, close: 363.50 } }
  },
  {
    month: "פברואר", year: 2026,
    config: { base: 27980, grade: "765/292", position: "אדריכל העיר", type: "חוזה בכירים", fullTime: 173.333, seniority: "2.0 שנים" },
    received: { base: 27980, eshel: 809.25, phone: 117, extras: 258, extrasLabel: "שי לחג בכירים", diffs: 712.35 },
    calculated: { pensionFix: -335.76, grossBase: 27644.24, gross: 29282.84, carBenefit: 3810, rtn: 21, vaadBenefit: 182 },
    deducted: {
      mandatory: { tax: 6919, bituahLeumi: 1937.99, bituahBriut: 1621 },
      pension: { kehesh: 691.11, migdal: 64.84, mivtachim: 1491.98, menora: 466.62, insurance: 33 }
    },
    employer: { kehesh: 2073.32, migdal: 46.31, mivtachim: 1598.55, mivtachimPiz: 1775.46, menora: 499.95, menoraPiz: 555.28 },
    net: 15731.02,
    leave: { vacation: { open: 18.89, used: 0, added: 0, close: 25.56 }, sick: { open: 363.50, close: 367.50 } }
  },
  {
    month: "מרץ", year: 2026,
    config: { base: 27980, grade: "765/292", position: "אדריכל העיר", type: "חוזה בכירים", fullTime: 173.333, seniority: "2.0 שנים" },
    received: { base: 27980, eshel: 809.25, phone: 117, extras: 0, extrasLabel: "", diffs: 0 },
    calculated: { pensionFix: -335.76, grossBase: 27644.24, gross: 28570.49, carBenefit: 3810, rtn: 21, vaadBenefit: 182 },
    deducted: {
      mandatory: { tax: 6652, bituahLeumi: 1884.39, bituahBriut: 1581.40 },
      pension: { kehesh: 691.11, migdal: 64.84, mivtachim: 1491.98, menora: 466.62, insurance: 33 }
    },
    employer: { kehesh: 2073.32, migdal: 46.31, mivtachim: 1598.55, mivtachimPiz: 1775.46, menora: 499.95, menoraPiz: 555.28 },
    net: 15705.15,
    leave: { vacation: { open: 25.56, used: 0, added: 0, close: 35.87 }, sick: { open: 367.50, close: 387.50 } }
  },
  {
    month: "אפריל", year: 2026,
    config: { base: 27980, grade: "765/292", position: "אדריכל העיר", type: "חוזה בכירים", fullTime: 173.333, seniority: "2.0 שנים" },
    received: { base: 27980, eshel: 809.25, phone: 117, extras: 0, extrasLabel: "", diffs: 0 },
    calculated: { pensionFix: -335.76, grossBase: 27644.24, gross: 28570.49, carBenefit: 3810, rtn: 21, vaadBenefit: 182 },
    deducted: {
      mandatory: { tax: 4971, bituahLeumi: 1884.39, bituahBriut: 1581.40 },
      pension: { kehesh: 691.11, migdal: 64.84, mivtachim: 1491.98, menora: 466.62, insurance: 33 }
    },
    employer: { kehesh: 2073.32, migdal: 46.31, mivtachim: 1598.55, mivtachimPiz: 1775.46, menora: 499.95, menoraPiz: 555.28 },
    net: 17386.15,
    leave: { vacation: { open: 35.87, used: 14.67, added: 0, close: 35.87 }, sick: { open: 387.50, close: 407.50 } }
  },
  {
    month: "מאי", year: 2026,
    config: { base: 27980, grade: "765/292", position: "אדריכל העיר", type: "חוזה בכירים", fullTime: 173.333, seniority: "2.0 שנים" },
    received: { base: 27980, eshel: 809.25, phone: 117, extras: 0, extrasLabel: "", diffs: 0 },
    calculated: { pensionFix: -335.76, grossBase: 27644.24, gross: 28570.49, carBenefit: 3810, rtn: 21, vaadBenefit: 182 },
    deducted: {
      mandatory: { tax: 6231, bituahLeumi: 1884.39, bituahBriut: 1581.40 },
      pension: { kehesh: 691.11, migdal: 64.84, mivtachim: 1491.98, menora: 466.62, insurance: 33 }
    },
    employer: { kehesh: 2073.32, migdal: 46.31, mivtachim: 1598.55, mivtachimPiz: 1775.46, menora: 499.95, menoraPiz: 555.28 },
    net: 16126.15,
    leave: { vacation: { open: 35.87, used: 9, added: 0, close: 41.53 }, sick: { open: 407.50, close: 427.50 } }
  }
];

const ALERTS = [
  { priority: "urgent", title: "4 קופות פנסיה פעילות", body: "הכסף מפוזר בין מגדל, מבטחים ומנורה. חשד לכפילות דמי ניהול. יש לבדוק עם יועץ פנסיוני אם איחוד ישתלם.", action: "לפנות לענת קידר — שלוחה 3" },
  { priority: "urgent", title: "תיקון פנסיוני שלילי קבוע", body: "335.76 ש\"ח מנוכים כל חודש כ'תיקון פנסיוני'. זה מקטין את הברוטו הפנסיוני ב-4,029 ש\"ח בשנה. יש לוודא שזה לא פוגע בזכויות.", action: "לפנות לענת קידר — שלוחה 3" },
  { priority: "important", title: "שווי רכב צמוד — חבות מס גבוהה", body: "3,810 ש\"ח/חודש מתווספים לברוטו למס בלי שמתקבל כסף. בשיעור מס שולי 47% = כ-1,790 ש\"ח מס נוסף/חודש = 21,480 ש\"ח/שנה.", action: "לשקול חישוב כדאיות רכב צמוד מול אלטרנטיבות" },
  { priority: "significant", title: "ירידת מס חריגה באפריל", body: "מס הכנסה צנח ל-4,971 (ממוצע: 6,546). ככל הנראה ריקלקולציה שנתית. תיקון חיובי — אבל כדאי לוודא שלא יהיה חיוב חוזר.", action: "לעקוב בחודשים הבאים" },
  { priority: "significant", title: "עליית שכר בפברואר", body: "שכר יסוד עלה 721 ש\"ח (2.6%) עם הפרשים רטרואקטיביים של 712.35. ככל הנראה עדכון דרגה בטבלת בכירים.", action: "לבדוק התאמה לטבלת בכירים עדכנית" },
  { priority: "negligible", title: "שי לחג — פברואר", body: "ניכוי חד פעמי של 258 ש\"ח. יש לוודא שהשי בפועל התקבל.", action: "" },
  { priority: "negligible", title: "קרן השתלמות — הטבת מס", body: "זקיפה של 895-1,272 ש\"ח/חודש. משיכה פטורה ממס מאוקטובר 2029 (6 שנות ותק).", action: "" },
];

const QA_DATA = [
  { q: "מה זה תיקון פנסיוני?", a: "תיקון פנסיוני הוא הפחתה מהשכר שמטרתה לתקן את הבסיס שממנו מחושבות ההפרשות לפנסיה. בחוזה בכירים לפעמים יש רכיבים שלא נכנסים לחישוב הפנסיוני, ולכן מתבצע 'תיקון' שמוריד את הברוטו הפנסיוני. אצלך הניכוי הוא 335.76 ש\"ח/חודש = 4,029 ש\"ח/שנה. חשוב לוודא שזה נכון." },
  { q: "למה המס השתנה בין החודשים?", a: "מס הכנסה מחושב על בסיס שנתי פרוגרסיבי, אבל נגבה כל חודש. לפעמים מערכת השכר מתקנת — אם גבתה יותר מדי בתחילת השנה, היא מפחיתה בהמשך (כמו שקרה באפריל, שם המס ירד ב-1,681 ש\"ח). זה נקרא 'ריקלקולציה'." },
  { q: "מה זה שווי רכב צמוד?", a: "כשמקבלים רכב צמוד מהמעסיק, רשות המסים מחשיבה את זה כהטבה — ומוסיפה לשכר 'שווי' של 3,810 ש\"ח/חודש. את לא מקבלת את הכסף, אבל משלמת עליו מס. בשיעור מס שולי של 47%, זה כ-1,790 ש\"ח מס נוסף כל חודש." },
  { q: "מה ההבדל בין ביטוח לאומי לביטוח בריאות?", a: "ביטוח לאומי מממן קצבאות (זקנה, נכות, אבטלה, ילדים). ביטוח בריאות מממן את מערכת הבריאות הציבורית (קופות חולים). שניהם מחושבים כאחוז מהשכר — ביטוח לאומי כ-6.7% וביטוח בריאות כ-5.6% (מעל תקרה מסוימת)." },
  { q: "מה זה קה\"ש (קרן השתלמות)?", a: "קרן השתלמות היא חיסכון לטווח בינוני. אחרי 6 שנים אפשר למשוך פטור ממס (עד תקרה). אצלך: העובדת מפרישה 2.5% (691 ש\"ח) והמעסיק 7.5% (2,073 ש\"ח). סה\"כ כ-2,764 ש\"ח/חודש = 33,168 ש\"ח/שנה נכנסים לקרן." },
  { q: "למה יש 4 קופות פנסיה?", a: "יש לך: (1) מגדל — קרן השתלמות, (2) מגדל — הפרשות הוצאות, (3) מבטחים חדשה — פנסיה, (4) מנורה — ביטוח משלים + פיצויים. הפיזור עשוי לנבוע ממעברים בין מעסיקים או מהסדרים שונים בחוזה. הבעיה: כל קופה גובה דמי ניהול בנפרד." },
  { q: "כמה כסף שם לי המעסיק בצד?", a: "העירייה מפרישה כ-6,549 ש\"ח/חודש בממוצע: מבטחים (פנסיה 1,599 + פיצויים 1,775), מגדל (קה\"ש 2,073 + הוצ 46), מנורה (משלים 500 + פיצויים 555). זה 23.4% מהשכר — כסף שלא רואים בתלוש אבל הוא שלך." },
  { q: "מה זה 2.25 נקודות זיכוי?", a: "נקודות זיכוי מפחיתות את המס. כל נקודה שווה 242 ש\"ח/חודש (2026). 2.25 נקודות = 544.50 ש\"ח הנחה במס כל חודש. מקבלים נקודה אחת בסיסית, חצי על תושבות, ורבע על אישה. בלי נקודות הזיכוי — המס היה גבוה ב-6,534 ש\"ח/שנה." },
  { q: "מה ההבדל בין ברוטו לנטו?", a: "ברוטו = הסכום לפני ניכויים (אצלך כ-28,570). נטו = מה שנשאר אחרי כל הניכויים (אצלך כ-16,074 ממוצע). ההפרש (12,496 ש\"ח/חודש) הולך ל: מס הכנסה (~6,231), ביטוח לאומי (~1,884), ביטוח בריאות (~1,581), וקופות פנסיה (~2,714)." },
  { q: "האם השכר שלי תואם את הטבלה?", a: "שכר יסוד 27,980 ש\"ח בדרוג בכירים 765/292 נראה סביר לתפקיד אדריכל עיר. כדאי לאמת מול טבלת השכר העדכנית של בכירים ברשויות מקומיות (מתפרסמת באתר משרד הפנים). שים לב שעלה מ-27,259 בינואר." },
];

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════
const fmt = (n) => Math.round(n).toLocaleString("he-IL");
const fmtD = (n) => n.toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (part, whole) => Math.round((part / whole) * 100);

const PRIORITY_COLORS = {
  urgent: { bg: "#FCEBEB", text: "#791F1F", border: "#F09595", label: "דחוף" },
  important: { bg: "#FAEEDA", text: "#633806", border: "#FAC775", label: "חשוב" },
  significant: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB", label: "משמעותי" },
  negligible: { bg: "#F1EFE8", text: "#444441", border: "#D3D1C7", label: "לידיעה" },
};

const CAT_COLORS = {
  config: { bg: "#F1EFE8", text: "#444441", label: "קונפיגורציה" },
  received: { bg: "#EAF3DE", text: "#27500A", label: "התקבל" },
  calculated: { bg: "#E6F1FB", text: "#0C447C", label: "מחושב" },
  deducted: { bg: "#FCEBEB", text: "#791F1F", label: "הופחת" },
  employer: { bg: "#EEEDFE", text: "#3C3489", label: "הפרשת מעסיק" },
};

// ═══════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════

function Tag({ type, colors }) {
  const c = colors || PRIORITY_COLORS[type] || PRIORITY_COLORS.negligible;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 4, background: c.bg, color: c.text, letterSpacing: "0.03em" }}>
      {c.label}
    </span>
  );
}

function NavBar({ page, setPage }) {
  const pages = [
    { id: "overview", label: "סקירה" },
    { id: "structure", label: "מבנה השכר" },
    { id: "trends", label: "מגמות" },
    { id: "savings", label: "חיסכון" },
    { id: "qa", label: "שאלות" },
  ];
  return (
    <nav style={{ borderBottom: "1px solid #E5E4E0", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 15, fontWeight: 600, padding: "14px 0", color: "#1D9E75" }}>תלוש חכם</div>
        <div style={{ display: "flex", gap: 0 }}>
          {pages.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} style={{
              padding: "14px 16px", fontSize: 13, border: "none", background: "none", cursor: "pointer",
              color: page === p.id ? "#1D9E75" : "#6B6A66", fontWeight: page === p.id ? 600 : 400,
              borderBottom: page === p.id ? "2px solid #1D9E75" : "2px solid transparent", fontFamily: "inherit"
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Breadcrumb({ items }) {
  return (
    <div style={{ fontSize: 12, color: "#9C9B97", marginBottom: 4 }}>
      {items.map((item, i) => (
        <span key={i}>{item}{i < items.length - 1 ? " / " : ""}</span>
      ))}
    </div>
  );
}

function PageTitle({ breadcrumb, title, subtitle }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <Breadcrumb items={breadcrumb} />
      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "4px 0" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, color: "#6B6A66" }}>{subtitle}</p>}
    </div>
  );
}

function KPI({ label, value, sub, color }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1rem 1.1rem" }}>
      <div style={{ fontSize: 11, color: "#9C9B97", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: color || "#1A1A18" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#9C9B97", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function MonthSelector({ selected, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: "1rem", flexWrap: "wrap" }}>
      {MONTHS.map((m, i) => (
        <button key={i} onClick={() => onChange(i)} style={{
          padding: "6px 14px", fontSize: 13, cursor: "pointer", border: "1px solid", borderRadius: 6, fontFamily: "inherit",
          background: selected === i ? "#1D9E75" : "#fff",
          color: selected === i ? "#fff" : "#6B6A66",
          borderColor: selected === i ? "#1D9E75" : "#E5E4E0"
        }}>
          {m}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B6A66", margin: "2rem 0 0.75rem", paddingBottom: 6, borderBottom: "1px solid #E5E4E0" }}>{children}</h3>;
}

function HBar({ label, value, max, color, suffix }) {
  const w = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
      <div style={{ fontSize: 12, color: "#6B6A66", width: 130, textAlign: "left", flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 20, background: "#F4F3F0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, width: 90, textAlign: "right", direction: "ltr", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
        {fmt(value)} {suffix || ""}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE: OVERVIEW
// ═══════════════════════════════════════════════════════
function OverviewPage({ setPage }) {
  const avgNet = Math.round(PAYSLIPS.reduce((s, p) => s + p.net, 0) / PAYSLIPS.length);
  const avgTax = Math.round(PAYSLIPS.reduce((s, p) => s + p.deducted.mandatory.tax, 0) / PAYSLIPS.length);
  const avgGross = Math.round(PAYSLIPS.reduce((s, p) => s + p.calculated.gross, 0) / PAYSLIPS.length);
  const totalEmployer = Math.round(PAYSLIPS[4].employer.kehesh + PAYSLIPS[4].employer.migdal + PAYSLIPS[4].employer.mivtachim + PAYSLIPS[4].employer.mivtachimPiz + PAYSLIPS[4].employer.menora + PAYSLIPS[4].employer.menoraPiz);

  return (
    <div>
      <PageTitle breadcrumb={["תלוש חכם", "סקירה"]} title="סקירה כללית" subtitle="ינואר — מאי 2026 — עיריית אשדוד — אדריכל העיר" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: "1.5rem" }}>
        <KPI label="שכר יסוד" value={fmt(27980)} sub="עלה 2.6% מינואר" />
        <KPI label="ממוצע נטו" value={fmt(avgNet)} sub={`${pct(avgNet, avgGross)}% מהברוטו`} color="#1D9E75" />
        <KPI label="ממוצע מס" value={fmt(avgTax)} sub={`${pct(avgTax, avgGross)}% מהברוטו`} color="#A32D2D" />
        <KPI label="הפרשות מעסיק" value={fmt(totalEmployer)} sub="23.4% מהשכר" color="#534AB7" />
      </div>

      {/* Where money goes - visual */}
      <SectionTitle>לאן הולך השכר — חודש טיפוסי</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1.25rem" }}>
        {(() => {
          const p = PAYSLIPS[4];
          const total = p.calculated.gross;
          const segments = [
            { label: "נטו לבנק", val: p.net, color: "#1D9E75" },
            { label: "מס הכנסה", val: p.deducted.mandatory.tax, color: "#A32D2D" },
            { label: "ביטוח לאומי", val: p.deducted.mandatory.bituahLeumi, color: "#D85A30" },
            { label: "ביטוח בריאות", val: p.deducted.mandatory.bituahBriut, color: "#BA7517" },
            { label: "קופות פנסיה", val: p.deducted.pension.kehesh + p.deducted.pension.migdal + p.deducted.pension.mivtachim + p.deducted.pension.menora + p.deducted.pension.insurance, color: "#534AB7" },
          ];
          return (
            <>
              <div style={{ display: "flex", height: 32, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
                {segments.map((s, i) => (
                  <div key={i} style={{ width: `${pct(s.val, total)}%`, background: s.color, transition: "width 0.3s" }} title={`${s.label}: ${fmt(s.val)}`} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 12, color: "#6B6A66" }}>
                {segments.map((s, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                    {s.label} — {fmt(s.val)} ({pct(s.val, total)}%)
                  </span>
                ))}
              </div>
            </>
          );
        })()}
      </div>

      {/* Alerts by priority */}
      <SectionTitle>התראות ותובנות</SectionTitle>
      {["urgent", "important", "significant", "negligible"].map(priority => {
        const items = ALERTS.filter(a => a.priority === priority);
        if (!items.length) return null;
        return (
          <div key={priority} style={{ marginBottom: 12 }}>
            {items.map((alert, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${PRIORITY_COLORS[priority].border}`, borderRight: `4px solid ${PRIORITY_COLORS[priority].border}`, borderRadius: 8, padding: "0.85rem 1.1rem", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{alert.title}</span>
                  <Tag type={priority} />
                </div>
                <div style={{ fontSize: 13, color: "#6B6A66", lineHeight: 1.65 }}>{alert.body}</div>
                {alert.action && <div style={{ fontSize: 12, color: PRIORITY_COLORS[priority].text, fontWeight: 500, marginTop: 6 }}>{alert.action}</div>}
              </div>
            ))}
          </div>
        );
      })}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "1.5rem" }}>
        <button onClick={() => setPage("structure")} style={{ padding: "14px", fontSize: 14, border: "1px solid #E5E4E0", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, color: "#1D9E75" }}>
          פירוק מבנה השכר →
        </button>
        <button onClick={() => setPage("qa")} style={{ padding: "14px", fontSize: 14, border: "1px solid #E5E4E0", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, color: "#378ADD" }}>
          שאלות ותשובות →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE: STRUCTURE
// ═══════════════════════════════════════════════════════
function StructurePage() {
  const [monthIdx, setMonthIdx] = useState(4);
  const [viewMode, setViewMode] = useState("flow"); // flow | category
  const p = PAYSLIPS[monthIdx];

  const totalMandatory = p.deducted.mandatory.tax + p.deducted.mandatory.bituahLeumi + p.deducted.mandatory.bituahBriut;
  const totalPension = p.deducted.pension.kehesh + p.deducted.pension.migdal + p.deducted.pension.mivtachim + p.deducted.pension.menora + p.deducted.pension.insurance;
  const afterMandatory = p.calculated.gross - totalMandatory;

  const flowRows = [
    { cat: "config", label: "שכר יסוד (חוזה)", val: p.received.base, explain: `דרוג ${p.config.grade} — ${p.config.type}` },
    { cat: "calculated", label: "תיקון פנסיוני", val: p.calculated.pensionFix, explain: "הפחתה מהברוטו הפנסיוני — קבוע בחוזה" },
    { cat: "received", label: "אש\"ל", val: p.received.eshel, explain: "תוספת חייבת במס הכנסה" },
    { cat: "received", label: "טלפון", val: p.received.phone, explain: "החזר הוצאות — רק 0.65 ש\"ח מוכר" },
    ...(p.received.extras ? [{ cat: "received", label: p.received.extrasLabel, val: p.received.extras, explain: "ניכוי חד פעמי" }] : []),
    ...(p.received.diffs ? [{ cat: "calculated", label: "הפרשים רטרואקטיביים", val: p.received.diffs, explain: "תיקון לחודש קודם" }] : []),
    { cat: "sum", label: "ברוטו שוטף", val: p.calculated.gross, explain: "" },
    { cat: "calculated", label: "שווי רכב צמוד (לא מקבלים)", val: p.calculated.carBenefit, explain: "מתווסף לברוטו למס — חיוב וירטואלי" },
    { cat: "deducted", label: "מס הכנסה", val: -p.deducted.mandatory.tax, explain: `${pct(p.deducted.mandatory.tax, p.calculated.gross)}% מהברוטו` },
    { cat: "deducted", label: "ביטוח לאומי", val: -p.deducted.mandatory.bituahLeumi, explain: "ניכוי חובה — מממן קצבאות" },
    { cat: "deducted", label: "ביטוח בריאות", val: -p.deducted.mandatory.bituahBriut, explain: "ניכוי חובה — מממן קופות חולים" },
    { cat: "sum", label: "אחרי ניכויי חובה", val: afterMandatory, explain: "" },
    { cat: "deducted", label: "קה\"ש מגדל (2.5%)", val: -p.deducted.pension.kehesh, explain: "קרן השתלמות — חיסכון עובדת" },
    { cat: "deducted", label: "מגדל הוצאות", val: -p.deducted.pension.migdal, explain: "" },
    { cat: "deducted", label: "מבטחים חדשה (7%)", val: -p.deducted.pension.mivtachim, explain: "פנסיה — חובה בחוק" },
    { cat: "deducted", label: "מנורה משלים (7%)", val: -p.deducted.pension.menora, explain: "ביטוח מנהלים" },
    { cat: "deducted", label: "ביטוח חיים", val: -p.deducted.pension.insurance, explain: "מנורה" },
    { cat: "net", label: "סכום בבנק", val: p.net, explain: "" },
  ];

  const categories = {
    config: flowRows.filter(r => r.cat === "config"),
    received: flowRows.filter(r => r.cat === "received"),
    calculated: flowRows.filter(r => r.cat === "calculated"),
    deducted: flowRows.filter(r => r.cat === "deducted"),
  };

  return (
    <div>
      <PageTitle breadcrumb={["תלוש חכם", "מבנה השכר"]} title={`מבנה השכר — ${p.month} ${p.year}`} subtitle="מהחוזה לבנק: כל שורה מוסברת" />

      <MonthSelector selected={monthIdx} onChange={setMonthIdx} />

      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem" }}>
        {[{ id: "flow", label: "זרימה" }, { id: "category", label: "לפי קטגוריה" }].map(v => (
          <button key={v.id} onClick={() => setViewMode(v.id)} style={{
            padding: "6px 16px", fontSize: 13, border: "1px solid", borderRadius: 6, fontFamily: "inherit", cursor: "pointer",
            background: viewMode === v.id ? "#1A1A18" : "#fff", color: viewMode === v.id ? "#fff" : "#6B6A66",
            borderColor: viewMode === v.id ? "#1A1A18" : "#E5E4E0"
          }}>
            {v.label}
          </button>
        ))}
      </div>

      {viewMode === "flow" ? (
        <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <tbody>
              {flowRows.map((row, i) => {
                const isSummary = row.cat === "sum" || row.cat === "net";
                const isNet = row.cat === "net";
                const catColor = CAT_COLORS[row.cat];
                return (
                  <tr key={i} style={{
                    background: isNet ? "#E1F5EE" : isSummary ? "#F4F3F0" : "transparent",
                    borderBottom: "1px solid #F0EFEB"
                  }}>
                    <td style={{ padding: "8px 14px", width: 24 }}>
                      {catColor && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: catColor.bg, border: `1px solid ${catColor.text}30` }} />}
                    </td>
                    <td style={{ padding: "8px 0", fontWeight: isSummary ? 600 : 400, color: isNet ? "#085041" : "#1A1A18" }}>{row.label}</td>
                    <td style={{ padding: "8px 14px", textAlign: "left", direction: "ltr", fontWeight: isSummary ? 600 : 500, fontVariantNumeric: "tabular-nums", color: row.val < 0 ? "#A32D2D" : isNet ? "#085041" : "#1A1A18", fontSize: isNet ? 15 : 13 }}>
                      {row.val < 0 ? fmtD(row.val) : fmtD(row.val)}
                    </td>
                    <td style={{ padding: "8px 14px", fontSize: 11, color: "#9C9B97" }}>{row.explain}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {Object.entries(categories).map(([catKey, rows]) => {
            const cat = CAT_COLORS[catKey];
            return (
              <div key={catKey} style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", background: cat.bg, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: cat.text }}>{cat.label}</span>
                  <span style={{ fontSize: 11, color: cat.text + "90" }}>
                    {catKey === "deducted" ? `סה"כ: ${fmt(Math.abs(rows.reduce((s, r) => s + r.val, 0)))}` :
                     catKey === "received" ? `סה"כ: ${fmt(rows.reduce((s, r) => s + r.val, 0))}` : ""}
                  </span>
                </div>
                {rows.map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid #F0EFEB", fontSize: 13 }}>
                    <span>{row.label}</span>
                    <span style={{ direction: "ltr", fontWeight: 500, fontVariantNumeric: "tabular-nums", color: row.val < 0 ? "#A32D2D" : "#1A1A18" }}>{fmtD(row.val)}</span>
                  </div>
                ))}
              </div>
            );
          })}
          <div style={{ background: "#E1F5EE", border: "1px solid #5DCAA5", borderRadius: 10, padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#085041" }}>סכום בבנק</span>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#085041", direction: "ltr" }}>{fmtD(p.net)}</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "1rem", fontSize: 11, color: "#9C9B97" }}>
        {Object.entries(CAT_COLORS).map(([key, c]) => (
          <span key={key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c.bg, border: `1px solid ${c.text}30` }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE: TRENDS
// ═══════════════════════════════════════════════════════
function TrendsPage() {
  const maxVal = Math.max(...PAYSLIPS.map(p => p.calculated.gross));

  return (
    <div>
      <PageTitle breadcrumb={["תלוש חכם", "מגמות"]} title="מגמות וקורלציות" subtitle="5 חודשים — מה עולה, מה יורד, ומה הקשר" />

      <SectionTitle>נטו לבנק — חודש אחרי חודש</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1.25rem" }}>
        {PAYSLIPS.map((p, i) => {
          const maxNet = Math.max(...PAYSLIPS.map(p => p.net));
          const w = Math.round((p.net / maxNet) * 100);
          const isHighest = p.net === maxNet;
          const isLowest = p.net === Math.min(...PAYSLIPS.map(p => p.net));
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 60, fontSize: 13, color: "#6B6A66", flexShrink: 0 }}>{p.month}</div>
              <div style={{ flex: 1, height: 28, background: "#F4F3F0", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: `${w}%`, background: isHighest ? "#1D9E75" : isLowest ? "#D85A30" : "#5DCAA5", borderRadius: 4, transition: "width 0.3s" }} />
              </div>
              <div style={{ width: 80, fontSize: 13, fontWeight: 600, direction: "ltr", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {fmt(p.net)}
              </div>
              {isHighest && <span style={{ fontSize: 10, color: "#1D9E75", fontWeight: 600 }}>גבוה</span>}
              {isLowest && <span style={{ fontSize: 10, color: "#D85A30", fontWeight: 600 }}>נמוך</span>}
            </div>
          );
        })}
      </div>

      <SectionTitle>מס הכנסה — תנודות</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1.25rem" }}>
        {PAYSLIPS.map((p, i) => {
          const maxTax = Math.max(...PAYSLIPS.map(p => p.deducted.mandatory.tax));
          const w = Math.round((p.deducted.mandatory.tax / maxTax) * 100);
          const isLow = p.deducted.mandatory.tax < 5500;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 60, fontSize: 13, color: "#6B6A66", flexShrink: 0 }}>{p.month}</div>
              <div style={{ flex: 1, height: 28, background: "#F4F3F0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${w}%`, background: isLow ? "#1D9E75" : "#378ADD", borderRadius: 4 }} />
              </div>
              <div style={{ width: 80, fontSize: 13, fontWeight: 600, direction: "ltr", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt(p.deducted.mandatory.tax)}</div>
              {isLow && <span style={{ fontSize: 10, color: "#1D9E75", fontWeight: 600 }}>ריקלקולציה</span>}
            </div>
          );
        })}
        <div style={{ marginTop: 12, padding: "10px 12px", background: "#E6F1FB", borderRadius: 6, fontSize: 12, color: "#0C447C", lineHeight: 1.6 }}>
          באפריל המס ירד ב-1,681 ש"ח — ככל הנראה מערכת השכר תיקנה גבייה ביתר. הנטו קפץ ל-17,386. כדאי לעקוב בחודשים הבאים — אם המס יעלה מעל 6,919 זה סימן לחיוב חוזר.
        </div>
      </div>

      <SectionTitle>קורלציות</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { title: "שכר → מס", body: "עליית 2.6% בשכר הייתה אמורה להעלות מס ב-2.6%. בפועל המס עלה 8.4% (ינואר→פברואר). סיבה: מדרגת מס פרוגרסיבית — כל שקל נוסף ממוסה ב-47%.", color: "#A32D2D" },
          { title: "מס → נטו", body: "קורלציה הפוכה מושלמת. כשהמס ירד 1,681 (אפריל) → הנטו עלה בדיוק 1,681. שאר הניכויים קבועים.", color: "#1D9E75" },
          { title: "ביטוחים", body: "ביטוח לאומי ובריאות יציבים לאחר פברואר (1,884 ו-1,581). היחס ביניהם קבוע: 1.19. שניהם מחושבים מאותו בסיס.", color: "#378ADD" },
          { title: "חופשה", body: "צבירה ליניארית: ~5.9 ימים/חודש. ניצלת 14.67 ימים. בקצב הזה, סוף 2026: ~76 ימים צבורים. מחלה: 427 ימים (צבירה גבוהה).", color: "#BA7517" },
        ].map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1rem" }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: c.color }}>{c.title}</div>
            <div style={{ fontSize: 12, color: "#6B6A66", lineHeight: 1.65 }}>{c.body}</div>
          </div>
        ))}
      </div>

      <SectionTitle>השוואת מבנה — כל החודשים</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1.25rem", overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", whiteSpace: "nowrap" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E5E4E0" }}>
              <th style={{ padding: "8px 10px", textAlign: "right", fontWeight: 600, color: "#6B6A66" }}>רכיב</th>
              {PAYSLIPS.map((p, i) => (
                <th key={i} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: "#6B6A66", direction: "ltr" }}>{p.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "שכר יסוד", key: "base", get: p => p.received.base },
              { label: "ברוטו", key: "gross", get: p => p.calculated.gross },
              { label: "מס הכנסה", key: "tax", get: p => p.deducted.mandatory.tax },
              { label: "ביטוח לאומי", key: "bl", get: p => p.deducted.mandatory.bituahLeumi },
              { label: "הפרשות עובדת", key: "emp", get: p => p.deducted.pension.kehesh + p.deducted.pension.migdal + p.deducted.pension.mivtachim + p.deducted.pension.menora + p.deducted.pension.insurance },
              { label: "נטו לבנק", key: "net", get: p => p.net },
            ].map(row => {
              const vals = PAYSLIPS.map(p => row.get(p));
              const maxV = Math.max(...vals);
              const minV = Math.min(...vals);
              return (
                <tr key={row.key} style={{ borderBottom: "1px solid #F0EFEB" }}>
                  <td style={{ padding: "8px 10px", color: "#1A1A18", fontWeight: 500 }}>{row.label}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{
                      padding: "8px 10px", textAlign: "left", direction: "ltr", fontVariantNumeric: "tabular-nums",
                      fontWeight: v === maxV || v === minV ? 600 : 400,
                      color: row.key === "net" ? (v === maxV ? "#1D9E75" : v === minV ? "#D85A30" : "#1A1A18") :
                             row.key === "tax" ? (v === minV ? "#1D9E75" : v === maxV ? "#A32D2D" : "#1A1A18") : "#1A1A18"
                    }}>
                      {fmt(v)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE: SAVINGS
// ═══════════════════════════════════════════════════════
function SavingsPage() {
  const p = PAYSLIPS[4]; // May data
  const empTotal = p.employer.kehesh + p.employer.migdal + p.employer.mivtachim + p.employer.mivtachimPiz + p.employer.menora + p.employer.menoraPiz;
  const workerTotal = p.deducted.pension.kehesh + p.deducted.pension.migdal + p.deducted.pension.mivtachim + p.deducted.pension.menora + p.deducted.pension.insurance;
  const maxBar = Math.max(empTotal, workerTotal);

  const funds = [
    {
      name: "מגדל — קרן השתלמות",
      worker: p.deducted.pension.kehesh, workerPct: "2.50%",
      employer: p.employer.kehesh, employerPct: "7.50%",
      type: "חיסכון", explain: "פטור ממס לאחר 6 שנים (אוקטובר 2029)"
    },
    {
      name: "מגדל — הפרשות",
      worker: p.deducted.pension.migdal, workerPct: "",
      employer: p.employer.migdal, employerPct: "5.00%",
      type: "הפרשות", explain: ""
    },
    {
      name: "מבטחים — פנסיה חדשה",
      worker: p.deducted.pension.mivtachim, workerPct: "7.00%",
      employer: p.employer.mivtachim, employerPct: "7.50%",
      type: "פנסיה", explain: "חובה בחוק — קצבה חודשית בפרישה"
    },
    {
      name: "מבטחים — פיצויים",
      worker: 0, workerPct: "",
      employer: p.employer.mivtachimPiz, employerPct: "8.33%",
      type: "פיצויים", explain: "מעסיק בלבד — פיצויי פיטורים"
    },
    {
      name: "מנורה — משלים",
      worker: p.deducted.pension.menora, workerPct: "7.00%",
      employer: p.employer.menora, employerPct: "7.50%",
      type: "ביטוח", explain: "ביטוח מנהלים — כולל ריסק"
    },
    {
      name: "מנורה — פיצויים",
      worker: 0, workerPct: "",
      employer: p.employer.menoraPiz, employerPct: "8.33%",
      type: "פיצויים", explain: "מעסיק בלבד"
    },
    {
      name: "מנורה — ביטוח חיים",
      worker: p.deducted.pension.insurance, workerPct: "",
      employer: 0, employerPct: "",
      type: "ביטוח", explain: "33 ש\"ח/חודש"
    },
  ];

  return (
    <div>
      <PageTitle breadcrumb={["תלוש חכם", "חיסכון"]} title="הפרשות וחיסכון" subtitle="מה את שמה, מה המעסיק שם, ומה זה יהיה שווה" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: "1.5rem" }}>
        <KPI label="הפרשת עובדת/חודש" value={fmt(workerTotal)} sub="מנוכה מהשכר" color="#A32D2D" />
        <KPI label="הפרשת מעסיק/חודש" value={fmt(empTotal)} sub="לא בתלוש — אבל שלך" color="#534AB7" />
        <KPI label='סה"כ חודשי' value={fmt(Math.round(workerTotal + empTotal))} sub="עובדת + מעסיק" color="#1D9E75" />
        <KPI label="צפי שנתי" value={fmt(Math.round((workerTotal + empTotal) * 12))} sub='כ-111,000 ש"ח/שנה' color="#378ADD" />
      </div>

      <SectionTitle>עובדת מול מעסיק — מי שם יותר?</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1.25rem" }}>
        <HBar label="הפרשת עובדת" value={workerTotal} max={maxBar} color="#D85A30" />
        <HBar label="הפרשת מעסיק" value={empTotal} max={maxBar} color="#534AB7" />
        <div style={{ fontSize: 12, color: "#6B6A66", marginTop: 8 }}>
          המעסיק מפריש פי {(empTotal / workerTotal).toFixed(1)} ממה שמנוכה ממך. זה כסף ש"לא רואים" — אבל הוא צובר ריבית ותשואות בקופות.
        </div>
      </div>

      <SectionTitle>פירוט לפי קופה</SectionTitle>
      {funds.map((f, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "0.85rem 1.1rem", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</span>
            <Tag colors={{ bg: f.type === "פנסיה" ? "#E6F1FB" : f.type === "חיסכון" ? "#EAF3DE" : f.type === "פיצויים" ? "#EEEDFE" : "#FAEEDA", text: f.type === "פנסיה" ? "#0C447C" : f.type === "חיסכון" ? "#27500A" : f.type === "פיצויים" ? "#3C3489" : "#633806", label: f.type }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
            <div>
              <div style={{ color: "#9C9B97", marginBottom: 2 }}>עובדת {f.workerPct}</div>
              <div style={{ fontWeight: 600, direction: "ltr", color: f.worker ? "#1A1A18" : "#9C9B97" }}>{f.worker ? fmtD(f.worker) : "—"}</div>
            </div>
            <div>
              <div style={{ color: "#9C9B97", marginBottom: 2 }}>מעסיק {f.employerPct}</div>
              <div style={{ fontWeight: 600, direction: "ltr", color: f.employer ? "#534AB7" : "#9C9B97" }}>{f.employer ? fmtD(f.employer) : "—"}</div>
            </div>
          </div>
          {f.explain && <div style={{ fontSize: 11, color: "#9C9B97", marginTop: 6, lineHeight: 1.5 }}>{f.explain}</div>}
        </div>
      ))}

      <SectionTitle>יתרות חופשה ומחלה</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1rem" }}>
          <div style={{ fontSize: 11, color: "#9C9B97", textTransform: "uppercase" }}>חופשה צבורה</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#1D9E75", margin: "4px 0" }}>41.53 ימים</div>
          <div style={{ fontSize: 11, color: "#9C9B97" }}>ינואר 12.22 → מאי 41.53</div>
          <div style={{ fontSize: 11, color: "#9C9B97" }}>ניצול: 14.67 ימים | צבירה: ~5.9/חודש</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1rem" }}>
          <div style={{ fontSize: 11, color: "#9C9B97", textTransform: "uppercase" }}>מחלה צבורה</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#378ADD", margin: "4px 0" }}>427.50 ימים</div>
          <div style={{ fontSize: 11, color: "#9C9B97" }}>ינואר 343.50 → מאי 427.50</div>
          <div style={{ fontSize: 11, color: "#9C9B97" }}>צבירה: ~20 ימים/חודש</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE: Q&A
// ═══════════════════════════════════════════════════════
function QAPage() {
  const [openIdx, setOpenIdx] = useState(null);
  const [customQ, setCustomQ] = useState("");

  return (
    <div>
      <PageTitle breadcrumb={["תלוש חכם", "שאלות"]} title="שאלות ותשובות" subtitle="לחצי על שאלה כדי לקבל הסבר — או הקלידי שאלה חדשה" />

      <div style={{ background: "#E1F5EE", border: "1px solid #5DCAA5", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#085041", marginBottom: 4 }}>מדריך מהיר</div>
        <div style={{ fontSize: 13, color: "#0F6E56", lineHeight: 1.6 }}>
          האפליקציה מכילה תשובות מוכנות לשאלות הנפוצות. בגרסה המלאה — תוכלי לשאול כל שאלה חופשית ולקבל תשובה מבוססת על התלושים שלך.
        </div>
      </div>

      {QA_DATA.map((qa, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, marginBottom: 6, overflow: "hidden" }}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
            width: "100%", padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit",
            display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "right", fontSize: 13, fontWeight: 500
          }}>
            <span>{qa.q}</span>
            <span style={{ color: "#9C9B97", fontSize: 18, transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
          </button>
          {openIdx === i && (
            <div style={{ padding: "0 16px 14px", fontSize: 13, color: "#6B6A66", lineHeight: 1.7, borderTop: "1px solid #F0EFEB" }}>
              <div style={{ paddingTop: 12 }}>{qa.a}</div>
            </div>
          )}
        </div>
      ))}

      <SectionTitle>שאלה חופשית</SectionTitle>
      <div style={{ background: "#fff", border: "1px solid #E5E4E0", borderRadius: 10, padding: "1rem" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text" value={customQ} onChange={e => setCustomQ(e.target.value)}
            placeholder="מה תרצי לדעת על התלוש?"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #E5E4E0", borderRadius: 8, fontSize: 14, fontFamily: "inherit", direction: "rtl" }}
          />
          <button style={{ padding: "10px 20px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            שאלי
          </button>
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: "#9C9B97" }}>
          בגרסה המלאה — החיבור ל-AI יאפשר שאלות חופשיות על התלושים שלך, כמו "למה קיבלתי פחות באפריל?" או "כמה אני חוסכת בשנה?"
        </div>
      </div>

      <SectionTitle>שאלות מומלצות</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["למה המס ירד באפריל?", "מה זה תיקון פנסיוני?", "כמה כסף שם המעסיק?", "האם השכר שלי תואם?", "מה זה שווי רכב?"].map((q, i) => (
          <button key={i} onClick={() => { const idx = QA_DATA.findIndex(qa => qa.q.includes(q.slice(0, 10))); if (idx >= 0) setOpenIdx(idx); }}
            style={{ padding: "6px 14px", fontSize: 12, border: "1px solid #E5E4E0", borderRadius: 20, background: "#fff", cursor: "pointer", fontFamily: "inherit", color: "#6B6A66" }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", direction: "rtl", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}>
      <NavBar page={page} setPage={setPage} />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "1.5rem" }}>
        {page === "overview" && <OverviewPage setPage={setPage} />}
        {page === "structure" && <StructurePage />}
        {page === "trends" && <TrendsPage />}
        {page === "savings" && <SavingsPage />}
        {page === "qa" && <QAPage />}
      </div>
    </div>
  );
}
