import Rich from "./Rich.jsx";
import { MONTHS } from "../data/payslips.js";
import { fmt } from "../lib/format.js";
import { PRIORITY } from "../lib/colors.js";


export function Tag({ type, colors }) {
  const c = colors || PRIORITY[type] || PRIORITY.negligible;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", background: c.bg, color: c.text, fontFamily: "var(--mono)", letterSpacing: ".03em" }}>
      {c.label}
    </span>
  );
}

export function PageTitle({ crumbs, title, subtitle }) {
  return (
    <header className="rise" style={{ marginBottom: 8 }}>
      <nav className="crumbs" aria-label="פירורי לחם">
        <a href="#">תלוש חכם</a>
        {crumbs.map((c) => <span key={c}> / {c}</span>)}
      </nav>
      <h1 className="page-title">{title}</h1>
      {subtitle && <Rich as="p" className="page-sub">{subtitle}</Rich>}
    </header>
  );
}

export function KPI({ label, value, sub, color }) {
  return (
    <div className="card rise">
      <div className="label">{label}</div>
      <div className="num" style={{ fontSize: 28, color: color || "var(--ink)", margin: "6px 0 2px" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{sub}</div>}
    </div>
  );
}

export function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

export function MonthSelector({ selected, onChange }) {
  return (
    <div role="group" aria-label="בחירת חודש" style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
      {MONTHS.map((m, i) => (
        <button key={m} className="press chip" aria-pressed={selected === i} onClick={() => onChange(i)}>{m}</button>
      ))}
    </div>
  );
}

export function HBar({ label, value, max, color }) {
  const w = Math.round((value / max) * 100);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "110px minmax(0,1fr) 84px", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{label}</div>
      <div style={{ height: 22, background: "#F4F3F0", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, transition: "width .4s" }} />
      </div>
      <div className="num" style={{ fontSize: 13, textAlign: "left" }}>{fmt(value)}</div>
    </div>
  );
}

export function Tone({ tone, title, children }) {
  return (
    <div className={`tone tone-${tone} rise`}>
      {title && <h4>{title}</h4>}
      <Rich as="p">{children}</Rich>
    </div>
  );
}
