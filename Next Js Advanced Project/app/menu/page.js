import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import FilterShell from "../../components/FilterShell";
import { getDishes } from "../../lib/data";
import LiveMenu from "./live-menu";
export const revalidate = 60;
export const metadata = { title: "Menu", description: "Browse Ethiopian mains, sides and drinks available from Addis Eats." };
export default async function MenuPage() { const dishes = await getDishes(); return <main className="shell menu-page"><p className="eyebrow">WHAT SOUNDS GOOD?</p><h1>Our menu</h1><p className="muted">Simple favourites, priced in ETB.</p><LiveMenu /><CategoryBar /><FilterShell><DishList dishes={dishes} /></FilterShell></main>; }
