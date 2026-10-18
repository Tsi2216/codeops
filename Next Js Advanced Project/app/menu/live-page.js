import LiveMenu from "./live-menu";
export const metadata = { title: "Live menu search", description: "Search the Addis Eats menu with live updates." };
export default function LiveMenuPage() { return <main className="shell"><h1>Find a dish</h1><LiveMenu /></main>; }
