import { PAYSLIPS, ALERTS } from "../data/payslips.js";
import { fmt, pct, segmentsOf, sumEmployer } from "../lib/format.js";
import { go } from "../lib/route.js";
import { PRIORITY } from "../lib/colors.js";
import Rich from "../components/Rich.jsx";
import { KPI, PageTitle, SectionTitle, Tag } from "../components/ui.jsx";

export default function Overview() {
  const avgNet = Math.round(PAYSLIPS.reduce((s, p) => s + p.net, 0) / PAYSLIPS.length);
  const avgTax = Math.round(PAYSLIPS.reduce((s, p) => s + p.deducted.mandatory.tax, 0) / PAYSLIPS.length);
  const avgGross = Math.round(PAYSLIPS.reduce((s, p) => s + p.calculated.gross, 0) / PAYSLIPS.length);
  const last = PAYSLIPS[PAYSLIPS.length - 1];
  const totalEmployer = Math.round(sumEmployer(last));
  const segments = segmentsOf(last);
  const total = last.calculated.gross;

  return (
    <div className="page">
      <PageTitle crumbs={["סקירה"]} title="סקירה כללית" subtitle="ינואר עד מאי **2026**, עיריית אשדוד, אדריכל העיר." />

      <div className="grid-kpi" style={{ marginBottom: 24 }}>
        <KPI label="שכר יסוד" value={fmt(27980)} sub="עלה 2.6% מינואר" />
        <KPI label="ממוצע נטו" value={fmt(avgNet)} sub={`${pct(avgNet, avgGross)}% מהברוטו`} color="var(--bank)" />
        <KPI label="ממוצע מס" value={fmt(avgTax)} sub={`${pct(avgTax, avgGross)}% מהברוטו`} color="var(--cut)" />
        <KPI label="הפרשות מעסיק" value={fmt(totalEmployer)} sub="23.4% מהשכר" color="var(--employer)" />
      </div>

      <SectionTitle>לאן הולך השכר בחודש טיפוסי</SectionTitle>
      <div className="card">
        <div style={{ display: "flex", height: 32, overflow: "hidden", marginBottom: 12 }}>
          {segments.map((s) => (
            <div key={s.key} style={{ width: `${pct(s.val, total)}%`, background: s.color, transition: "width .4s" }} title={`${s.label}: ${fmt(s.val)}`} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 13, color: "var(--ink-soft)" }}>
          {segments.map((s) => (
            <span key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="swatch" style={{ background: s.color }} />
              {s.label} <bdi className="num">{fmt(s.val)}</bdi> <bdi className="num" style={{ color: "var(--ink-mute)" }}>{pct(s.val, total)}%</bdi>
            </span>
          ))}
        </div>
      </div>

      <SectionTitle>התראות ותובנות</SectionTitle>
      {["urgent", "important", "significant", "negligible"].map((priority) =>
        ALERTS.filter((a) => a.priority === priority).map((alert) => (
          <article key={alert.title} className="card rise" style={{ borderRight: `4px solid ${PRIORITY[priority].border}`, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>{alert.title}</h3>
              <Tag type={priority} />
            </div>
            <Rich as="p" className="alert-body">{alert.body}</Rich>
            {alert.action && <div style={{ fontSize: 13, color: PRIORITY[priority].text, fontWeight: 500, marginTop: 8 }}>{alert.action}</div>}
          </article>
        ))
      )}

      <div className="grid-2" style={{ marginTop: 24 }}>
        <button className="press btn" onClick={() => go("structure")}>לפירוק מבנה השכר</button>
        <button className="press btn" onClick={() => go("qa")}>לשאלות ותשובות</button>
      </div>
    </div>
  );
}
