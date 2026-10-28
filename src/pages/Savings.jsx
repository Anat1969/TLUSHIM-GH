import { PAYSLIPS } from "../data/payslips.js";
import { fmt, fmtD, sumEmployer, sumPension } from "../lib/format.js";
import { HBar, KPI, PageTitle, SectionTitle, Tag, Tone } from "../components/ui.jsx";

const TYPE_COLORS = {
  "פנסיה": { bg: "#E6F1FB", text: "#0C447C" },
  "חיסכון": { bg: "#EAF3DE", text: "#27500A" },
  "פיצויים": { bg: "#EEEDFE", text: "#3C3489" },
  "ביטוח": { bg: "#FAEEDA", text: "#633806" },
  "הפרשות": { bg: "#FAEEDA", text: "#633806" },
};

export default function Savings() {
  const p = PAYSLIPS[PAYSLIPS.length - 1]; // מאי
  const empTotal = sumEmployer(p);
  const workerTotal = sumPension(p);
  const maxBar = Math.max(empTotal, workerTotal);

  const funds = [
    { name: "מגדל, קרן השתלמות", worker: p.deducted.pension.kehesh, workerPct: "2.50%", employer: p.employer.kehesh, employerPct: "7.50%", type: "חיסכון", explain: "פטור ממס לאחר 6 שנים (אוקטובר 2029)" },
    { name: "מגדל, הפרשות", worker: p.deducted.pension.migdal, workerPct: "", employer: p.employer.migdal, employerPct: "5.00%", type: "הפרשות", explain: "" },
    { name: "מבטחים, פנסיה חדשה", worker: p.deducted.pension.mivtachim, workerPct: "7.00%", employer: p.employer.mivtachim, employerPct: "7.50%", type: "פנסיה", explain: "חובה בחוק, קצבה חודשית בפרישה" },
    { name: "מבטחים, פיצויים", worker: 0, workerPct: "", employer: p.employer.mivtachimPiz, employerPct: "8.33%", type: "פיצויים", explain: "מעסיק בלבד, פיצויי פיטורים" },
    { name: "מנורה, משלים", worker: p.deducted.pension.menora, workerPct: "7.00%", employer: p.employer.menora, employerPct: "7.50%", type: "ביטוח", explain: "ביטוח מנהלים, כולל ריסק" },
    { name: "מנורה, פיצויים", worker: 0, workerPct: "", employer: p.employer.menoraPiz, employerPct: "8.33%", type: "פיצויים", explain: "מעסיק בלבד" },
    { name: "מנורה, ביטוח חיים", worker: p.deducted.pension.insurance, workerPct: "", employer: 0, employerPct: "", type: "ביטוח", explain: "33 ש\"ח בחודש" },
  ];

  return (
    <div className="page">
      <PageTitle crumbs={["חיסכון"]} title="הפרשות וחיסכון" subtitle="מה את שמה, מה המעסיק שם, ומה זה **שווה בשנה**." />

      <div className="grid-kpi" style={{ marginBottom: 24 }}>
        <KPI label="הפרשת עובדת בחודש" value={fmt(workerTotal)} sub="מנוכה מהשכר" color="var(--cut)" />
        <KPI label="הפרשת מעסיק בחודש" value={fmt(empTotal)} sub="לא בתלוש, אבל שלך" color="var(--employer)" />
        <KPI label="סה״כ חודשי" value={fmt(Math.round(workerTotal + empTotal))} sub="עובדת ומעסיק" color="var(--bank)" />
        <KPI label="צפי שנתי" value={fmt(Math.round((workerTotal + empTotal) * 12))} sub="כ-111,000 ש״ח בשנה" color="var(--sky)" />
      </div>

      <SectionTitle>עובדת מול מעסיק: מי שם יותר?</SectionTitle>
      <div className="card">
        <HBar label="הפרשת עובדת" value={workerTotal} max={maxBar} color="var(--rust)" />
        <HBar label="הפרשת מעסיק" value={empTotal} max={maxBar} color="var(--employer)" />
      </div>
      <div style={{ marginTop: 10 }}>
        <Tone tone="insight">{`==המעסיק מפריש פי ${(empTotal / workerTotal).toFixed(1)} ממה שמנוכה ממך.== הכסף הזה צובר ריבית ותשואה בקופות.`}</Tone>
      </div>

      <SectionTitle>פירוט לפי קופה</SectionTitle>
      <div className="grid-2">
        {funds.map((f) => (
          <div key={f.name} className="card rise">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</span>
              <Tag colors={{ ...TYPE_COLORS[f.type], label: f.type }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div className="label">עובדת {f.workerPct}</div>
                <div className="num" style={{ fontSize: 17, color: f.worker ? "var(--ink)" : "var(--ink-mute)" }}>{f.worker ? fmtD(f.worker) : "אין"}</div>
              </div>
              <div>
                <div className="label">מעסיק {f.employerPct}</div>
                <div className="num" style={{ fontSize: 17, color: f.employer ? "var(--employer)" : "var(--ink-mute)" }}>{f.employer ? fmtD(f.employer) : "אין"}</div>
              </div>
            </div>
            {f.explain && <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 8 }}>{f.explain}</div>}
          </div>
        ))}
      </div>

      <SectionTitle>יתרות חופשה ומחלה</SectionTitle>
      <div className="grid-2">
        <div className="card">
          <div className="label">חופשה צבורה</div>
          <div className="num" style={{ fontSize: 26, color: "var(--bank)", margin: "6px 0" }}>41.53 <span style={{ fontFamily: "var(--font)", fontSize: 15 }}>ימים</span></div>
          <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>ינואר 12.22, מאי 41.53. ניצול 14.67 ימים, צבירה כ-5.9 בחודש.</div>
        </div>
        <div className="card">
          <div className="label">מחלה צבורה</div>
          <div className="num" style={{ fontSize: 26, color: "var(--sky)", margin: "6px 0" }}>427.50 <span style={{ fontFamily: "var(--font)", fontSize: 15 }}>ימים</span></div>
          <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>ינואר 343.50, מאי 427.50. צבירה כ-20 ימים בחודש.</div>
        </div>
      </div>
    </div>
  );
}
