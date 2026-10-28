import { PAYSLIPS } from "../data/payslips.js";
import { fmt, fmtD, pct, sumMandatory } from "../lib/format.js";
import { go } from "../lib/route.js";
import { CATEGORY } from "../lib/colors.js";
import { MonthSelector, PageTitle } from "../components/ui.jsx";

// החודש והתצוגה נשמרים בכתובת, כך שקישור מועתק פותח בדיוק את אותו מצב.
export default function Structure({ params }) {
  const monthIdx = Math.min(PAYSLIPS.length - 1, Math.max(0, Number(params.m ?? PAYSLIPS.length - 1)));
  const viewMode = params.v === "category" ? "category" : "flow";
  const setState = (m, v) => go("structure", { m, v });
  const p = PAYSLIPS[monthIdx];

  const afterMandatory = p.calculated.gross - sumMandatory(p);

  const flowRows = [
    { cat: "config", label: "שכר יסוד (חוזה)", val: p.received.base, explain: `דרוג ${p.config.grade}, ${p.config.type}` },
    { cat: "calculated", label: "תיקון פנסיוני", val: p.calculated.pensionFix, explain: "הפחתה מהברוטו הפנסיוני, קבועה בחוזה" },
    { cat: "received", label: "אש\"ל", val: p.received.eshel, explain: "תוספת חייבת במס הכנסה" },
    { cat: "received", label: "טלפון", val: p.received.phone, explain: "החזר הוצאות, רק 0.65 ש\"ח מוכר" },
    ...(p.received.extras ? [{ cat: "received", label: p.received.extrasLabel, val: p.received.extras, explain: "ניכוי חד־פעמי" }] : []),
    ...(p.received.diffs ? [{ cat: "calculated", label: "הפרשים רטרואקטיביים", val: p.received.diffs, explain: "תיקון לחודש קודם" }] : []),
    { cat: "sum", label: "ברוטו שוטף", val: p.calculated.gross, explain: "" },
    { cat: "calculated", label: "שווי רכב צמוד (לא מקבלים)", val: p.calculated.carBenefit, explain: "מתווסף לברוטו למס, חיוב וירטואלי" },
    { cat: "deducted", label: "מס הכנסה", val: -p.deducted.mandatory.tax, explain: `${pct(p.deducted.mandatory.tax, p.calculated.gross)}% מהברוטו` },
    { cat: "deducted", label: "ביטוח לאומי", val: -p.deducted.mandatory.bituahLeumi, explain: "ניכוי חובה, מממן קצבאות" },
    { cat: "deducted", label: "ביטוח בריאות", val: -p.deducted.mandatory.bituahBriut, explain: "ניכוי חובה, מממן קופות חולים" },
    { cat: "sum", label: "אחרי ניכויי חובה", val: afterMandatory, explain: "" },
    { cat: "deducted", label: "קה\"ש מגדל (2.5%)", val: -p.deducted.pension.kehesh, explain: "קרן השתלמות, חיסכון עובדת" },
    { cat: "deducted", label: "מגדל הוצאות", val: -p.deducted.pension.migdal, explain: "" },
    { cat: "deducted", label: "מבטחים חדשה (7%)", val: -p.deducted.pension.mivtachim, explain: "פנסיה, חובה בחוק" },
    { cat: "deducted", label: "מנורה משלים (7%)", val: -p.deducted.pension.menora, explain: "ביטוח מנהלים" },
    { cat: "deducted", label: "ביטוח חיים", val: -p.deducted.pension.insurance, explain: "מנורה" },
    { cat: "net", label: "סכום בבנק", val: p.net, explain: "" },
  ];

  const categories = {
    config: flowRows.filter((r) => r.cat === "config"),
    received: flowRows.filter((r) => r.cat === "received"),
    calculated: flowRows.filter((r) => r.cat === "calculated"),
    deducted: flowRows.filter((r) => r.cat === "deducted"),
  };

  return (
    <div className="page">
      <PageTitle crumbs={["מבנה השכר"]} title={`מבנה השכר, ${p.month} ${p.year}`} subtitle="מהחוזה לבנק: **כל שורה** מוסברת." />

      <MonthSelector selected={monthIdx} onChange={(m) => setState(m, viewMode)} />

      <div role="group" aria-label="תצוגה" style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[{ id: "flow", label: "זרימה" }, { id: "category", label: "לפי קטגוריה" }].map((v) => (
          <button key={v.id} className="press chip" aria-pressed={viewMode === v.id} onClick={() => setState(monthIdx, v.id)}>{v.label}</button>
        ))}
      </div>

      {viewMode === "flow" ? (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
            <tbody>
              {flowRows.map((row, i) => {
                const isSummary = row.cat === "sum" || row.cat === "net";
                const isNet = row.cat === "net";
                const catColor = CATEGORY[row.cat];
                return (
                  <tr key={i} style={{ background: isNet ? "var(--bank-wash)" : isSummary ? "#F4F3F0" : "transparent", borderBottom: "1px solid var(--rule-soft)" }}>
                    <td style={{ padding: "10px 14px", width: 24 }}>
                      {catColor && <span className="swatch" style={{ background: catColor.bg, border: `1px solid ${catColor.text}30` }} />}
                    </td>
                    <td style={{ padding: "10px 0", fontWeight: isSummary ? 600 : 400, color: isNet ? "var(--bank-deep)" : "var(--ink)" }}>{row.label}</td>
                    <td className="num" style={{ padding: "10px 14px", textAlign: "left", fontWeight: isSummary ? 700 : 600, color: row.val < 0 ? "var(--cut)" : isNet ? "var(--bank-deep)" : "var(--ink)", fontSize: isNet ? 17 : 14 }}>
                      {fmtD(row.val)}
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--ink-mute)" }}>{row.explain}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {Object.entries(categories).map(([catKey, rows]) => {
            const cat = CATEGORY[catKey];
            return (
              <div key={catKey} className="card rise" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", background: cat.bg, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: cat.text }}>{cat.label}</span>
                  <span className="num" style={{ fontSize: 12, color: cat.text }}>
                    {catKey === "deducted" ? `סה"כ ${fmt(Math.abs(rows.reduce((s, r) => s + r.val, 0)))}` :
                      catKey === "received" ? `סה"כ ${fmt(rows.reduce((s, r) => s + r.val, 0))}` : ""}
                  </span>
                </div>
                {rows.map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--rule-soft)", fontSize: 14 }}>
                    <span>{row.label}</span>
                    <span className="num" style={{ color: row.val < 0 ? "var(--cut)" : "var(--ink)" }}>{fmtD(row.val)}</span>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="tone tone-solution" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--bank-deep)" }}>סכום בבנק</span>
            <span className="num" style={{ fontSize: 22, color: "var(--bank-deep)" }}>{fmtD(p.net)}</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16, fontSize: 12, color: "var(--ink-mute)" }}>
        {Object.entries(CATEGORY).map(([key, c]) => (
          <span key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span className="swatch" style={{ background: c.bg, border: `1px solid ${c.text}30` }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
