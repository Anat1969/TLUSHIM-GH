import { useRoute } from "./lib/route.js";
import TopBar from "./components/TopBar.jsx";
import Home from "./pages/Home.jsx";
import Overview from "./pages/Overview.jsx";
import Structure from "./pages/Structure.jsx";
import Trends from "./pages/Trends.jsx";
import Savings from "./pages/Savings.jsx";
import QA from "./pages/QA.jsx";

const PAGES = { home: Home, overview: Overview, structure: Structure, trends: Trends, savings: Savings, qa: QA };

export default function App() {
  const { page, params } = useRoute();
  const Page = PAGES[page] || Home;
  return (
    <>
      <TopBar page={page} />
      <main key={page}>
        <Page params={params} />
      </main>
    </>
  );
}
