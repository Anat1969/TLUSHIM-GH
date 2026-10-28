import { PAYSLIPS, CORRELATIONS } from "../data/payslips.js";
import { fmt, sumPension } from "../lib/format.js";
import { PageTitle, SectionTitle, Tone } from "../components/ui.jsx";

function MonthBars({ get, colorOf, badgeOf }) {
  const vals = PAYSLIPS.map(get);
  const max = Math.max(...vals);
  return (
    <div className="card">
      {PAYSLIPS.map((p, i) => {
        const badge = badgeOf(vals[i], vals);
        return (
          <div key={p.month} style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) 72px 70px", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>{p.month}</div>
            <div style={{ height: 28, background: "#F4F3F0", overflow: "hidden" }}>
              <div className="bar-grow" style={{ height: "100%", width: `${Math.round((vals[i] / max) * 100)}%`, background: colorOf(vals[i], vals), animationDelay: `${i * 80}ms` }} />
            </div>
            <div className="num" style={{ fontSize: 14, textAlign: "left" }}>{fmt(vals[i])}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: badge?.color }}>{badge?.text}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Trends() {
  return (
    <div className="page">
      <PageTitle crumbs={["מגמות"]} title="מגמות וקורלציות" subtitle="**5** חודשים: מה עולה, מה יורד, ומה הקשר." />

      <SectionTitle>נטו לבנק, חודש אחרי חודש</SectionTitle>
      <MonthBars get={(p) => p.net}
        colorOf={(v, vs) => (v === Math.max(...vs) ? "var(--bank)" : v === Math.min(...vs) ? "var(--rust)" : "#5DCAA5")}
        badgeOf={(v, vs) => (v === Math.max(...vs) ? { text: "גבוה", color: "var(--bank)" } : v === Math.min(...vs) ? { text: "נמוך", color: "var(--rust)" } : null)} />

      <SectionTitle>מס הכנסה: תנודות</SectionTitle>
      <MonthBars get={(p) => p.deducted.mandatory.tax}
        colorOf={(v) => (v < 5500 ? "var(--bank)" : "var(--sky)")}
        badgeOf={(v) => (v < 5500 ? { text: "ריקלקולציה", color: "var(--bank)" } : null)} />
      <div style={{ marginTop: 10 }}>
        <Tone tone="insight">{"באפריל המס ירד ב-**1,681** ש\"ח, והנטו קפץ ל-**17,386**. ==אם המס יעלה מעל 6,919, זה סימן לחיוב חוזר.=="}</Tone>
      </div>

      <SectionTitle>קורלציות</SectionTitle>
      <div className="grid-2">
        {CORRELATIONS.map((c) => <Tone key={c.title} tone={c.tone} title={c.title}>{c.body}</Tone>)}
      </div>

      <SectionTitle>השוואת מבנה, כל החודשים</SectionTitle>
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", whiteSpace: "nowrap" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--rule)" }}>
              <th className="label" style={{ padding: "8px 10px", textAlign: "right" }}>רכיב</th>
              {PAYSLIPS.map((p) => <th key={p.month} className="label" style={{ padding: "8px 10px", textAlign: "left" }}>{p.month}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "שכר יסוד", key: "base", get: (p) => p.received.base },
              { label: "ברוטו", key: "gross", get: (p) => p.calculated.gross },
              { label: "מס הכנסה", key: "tax", get: (p) => p.deducted.mandatory.tax },
              { label: "ביטוח לאומי", key: "bl", get: (p) => p.deducted.mandatory.bituahLeumi },
              { label: "הפרשות עובדת", key: "emp", get: sumPension },
              { label: "נטו לבנק", key: "net", get: (p) => p.net },
            ].map((row) => {
              const vals = PAYSLIPS.map(row.get);
              const maxV = Math.max(...vals), minV = Math.min(...vals);
              return (
                <tr key={row.key} style={{ borderBottom: "1px solid var(--rule-soft)" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 500 }}>{row.label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="num" style={{
                      padding: "8px 10px", textAlign: "left", fontWeight: v === maxV || v === minV ? 700 : 400,
                      color: row.key === "net" ? (v === maxV ? "var(--bank)" : v === minV ? "var(--rust)" : "var(--ink)") :
                        row.key === "tax" ? (v === minV ? "var(--bank)" : v === maxV ? "var(--cut)" : "var(--ink)") : "var(--ink)",
                    }}>{fmt(v)}</td>
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
