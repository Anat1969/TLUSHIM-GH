import { go } from "../lib/route.js";

const PAGES = [
  { id: "overview", label: "סקירה" },
  { id: "structure", label: "מבנה השכר" },
  { id: "trends", label: "מגמות" },
  { id: "savings", label: "חיסכון" },
  { id: "qa", label: "שאלות" },
];

// סרגל עליון קבוע: שם האפליקציה ואייקון לבית, ניווט תוכן, וכפתור הלוגו היחיד בצד שמאל.
export default function TopBar({ page }) {
  return (
    <header className="topbar">
      <div className="topbar-in">
        <a className="brand" href="#" aria-label="תלוש חכם, לדף הבית">
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" />
          <span>תלוש חכם</span>
        </a>
        <nav className="tabs" aria-label="ניווט ראשי">
          {PAGES.map((p) => (
            <button key={p.id} className="tab" aria-current={page === p.id ? "page" : undefined} onClick={() => go(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
        <ai-menu />
      </div>
    </header>
  );
}
