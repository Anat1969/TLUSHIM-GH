import { useState } from "react";
import { QA_DATA } from "../data/payslips.js";
import Rich from "../components/Rich.jsx";
import { PageTitle, SectionTitle, Tone } from "../components/ui.jsx";

const SUGGESTED = ["למה המס השתנה", "מה זה תיקון פנסיוני", "כמה כסף שם לי המעסיק", "האם השכר שלי תואם", "מה זה שווי רכב"];

export default function QA() {
  const [openIdx, setOpenIdx] = useState(null);
  const [query, setQuery] = useState("");
  // חיפוש מקומי בשאלות ובתשובות. אין שליחה לשרת: הנתונים אישיים.
  const q = query.trim();
  const shown = QA_DATA.map((qa, i) => ({ ...qa, i })).filter((qa) => !q || qa.q.includes(q) || qa.a.includes(q));

  return (
    <div className="page">
      <PageTitle crumbs={["שאלות"]} title="שאלות ותשובות" subtitle="לחצי על שאלה, או **חפשי מילה** מהתלוש." />

      <Tone tone="solution" title="מדריך מהיר">{"==כל תשובה פותחת בשורה אחת שאומרת את העיקר==, ואחריה הסבר קצר עם המספרים שלך."}</Tone>

      <div style={{ display: "flex", gap: 8, margin: "20px 0 12px" }}>
        <input className="field" style={{ flex: 1, minWidth: 0 }} type="search" value={query} onChange={(e) => { setQuery(e.target.value); setOpenIdx(null); }}
          placeholder="למשל: פנסיה, רכב, נטו" aria-label="חיפוש בשאלות" />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {SUGGESTED.map((s) => (
          <button key={s} className="press chip" onClick={() => { setQuery(""); setOpenIdx(QA_DATA.findIndex((qa) => qa.q.startsWith(s))); }}>{s}?</button>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="card" style={{ color: "var(--ink-soft)" }}>לא נמצאה שאלה עם "{q}". נסי מילה אחרת, למשל "מס" או "פנסיה".</div>
      )}
      {shown.map((qa) => {
        const open = openIdx === qa.i;
        return (
          <div key={qa.i} className="card" style={{ padding: 0, marginBottom: 6 }}>
            <button className="qa-q" aria-expanded={open} onClick={() => setOpenIdx(open ? null : qa.i)}>
              <span>{qa.q}</span>
              <span aria-hidden="true" className="qa-sign">{open ? "−" : "+"}</span>
            </button>
            {open && <Rich as="p" className="qa-a">{qa.a}</Rich>}
          </div>
        );
      })}

      <SectionTitle>מה לא נמצא כאן</SectionTitle>
      <Tone tone="neutral">{"התשובות **מוכנות מראש** על סמך **5** תלושים. ==אין חיבור ל-AI ואין שליחה של נתוני שכר לשרת.=="}</Tone>
    </div>
  );
}
