import { useState } from "react";
import { PAYSLIPS, ALERTS } from "../data/payslips.js";
import { fmt, pct, segmentsOf, sumEmployer } from "../lib/format.js";
import { go } from "../lib/route.js";
import Rich from "../components/Rich.jsx";
import SalaryStack3D, { StackLegend } from "../components/SalaryStack3D.jsx";
import FlowRibbon from "../components/FlowRibbon.jsx";
import { MonthSelector, SectionTitle, Tone } from "../components/ui.jsx";

export default function Home() {
  const [active, setActive] = useState(null);
  const [month, setMonth] = useState(PAYSLIPS.length - 1);
  const p = PAYSLIPS[month];
  const gross = p.calculated.gross;
  const segments = segmentsOf(p);
  const avgNet = PAYSLIPS.reduce((s, x) => s + x.net, 0) / PAYSLIPS.length;
  const avgGross = PAYSLIPS.reduce((s, x) => s + x.calculated.gross, 0) / PAYSLIPS.length;
  const employer = sumEmployer(PAYSLIPS[PAYSLIPS.length - 1]);
  const urgent = ALERTS.filter((a) => a.priority === "urgent").length;

  const map = [
    { id: "overview", title: "סקירה", line: "המספרים המרכזיים וההתראות לפי דחיפות.", num: `${urgent} דחופות` },
    { id: "structure", title: "מבנה השכר", line: "כל שורה בתלוש, מהחוזה ועד הבנק, עם הסבר.", num: `${fmt(gross)} ברוטו` },
    { id: "trends", title: "מגמות", line: "מה עלה, מה ירד, ומה הקשר בין הרכיבים.", num: `${PAYSLIPS.length} חודשים` },
    { id: "savings", title: "חיסכון", line: "מה את שמה, מה המעסיק שם, ומה זה שווה בשנה.", num: `${fmt(employer)} מעסיק` },
    { id: "qa", title: "שאלות", line: "תשובות קצרות למושגים שבתלוש.", num: "10 תשובות" },
  ];

  return (
    <div className="page">
      <section className="hero">
        <div className="rise">
          <div className="label">תלוש חכם · ינואר עד מאי 2026 · עיריית אשדוד</div>
          <Rich as="h1">{`**${pct(avgNet, avgGross)}%** מהברוטו מגיע לבנק.`}</Rich>
          <Rich as="p">{"כל שורה בתלוש **מוסברת**, **ממוינת** ו**מושווית** בין חודשים, מהחוזה ועד הבנק. ==השאר הולך למס, לביטוחים ולחיסכון.=="}</Rich>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="press btn is-on" onClick={() => go("structure")}>לפירוק התלוש</button>
            <button className="press btn" onClick={() => go("overview")}>להתראות</button>
          </div>
        </div>
        <div>
          <SalaryStack3D segments={segments} total={gross} active={active} onActive={setActive} />
          <StackLegend segments={segments} total={gross} active={active} onActive={setActive} />
        </div>
      </section>

      <SectionTitle>מסלול הכסף: מהחוזה לבנק</SectionTitle>
      <MonthSelector selected={month} onChange={setMonth} />
      <div className="card ribbon-wrap" key={month}>
        <FlowRibbon gross={gross} net={p.net} branches={segments.filter((s) => s.key !== "net")} />
      </div>

      <SectionTitle>למה התלוש הזה</SectionTitle>
      <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <Tone tone="problem" title="הבעיה">{"תלוש של **30** שורות בקודים. ==אי אפשר לדעת מה מגיע, מה יורד, ולמה.=="}</Tone>
        <Tone tone="solution" title="הפתרון">{"כל רכיב **מסווג**, **מוסבר** ו**מושווה** בין **5** חודשים, עם התראה כשמשהו חורג."}</Tone>
        <Tone tone="insight" title="התובנה">{`==${fmt(employer)} ש"ח בחודש שהמעסיק מפריש לא מופיעים בנטו.== זה **23.4%** מהשכר, ושלך.`}</Tone>
      </div>

      <SectionTitle>מה בפנים</SectionTitle>
      <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
        {map.map((m, i) => (
          <button key={m.id} className="press map-card rise" style={{ animationDelay: `${i * 70}ms` }} onClick={() => go(m.id)}>
            <h3>{m.title}</h3>
            <p>{m.line}</p>
            <Rich className="map-num">{`**${m.num}**`}</Rich>
          </button>
        ))}
      </div>

      <p className="source">
        מקור השראה: מפת הזרימה של שארל־ז'וזף מינאר (Charles Joseph Minard, 1869) למסע נפוליאון למוסקבה. שם הפס מצטמצם עם האבדות, וכאן הוא מצטמצם עם הניכויים.
      </p>
    </div>
  );
}
