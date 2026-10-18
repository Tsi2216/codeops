import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";
import { getDish, getDishes } from "../../../lib/data";
export async function generateStaticParams() { return (await getDishes()).map(dish => ({ id: String(dish.id) })); }
export async function generateMetadata({ params }) { const { id } = await params; const dish = await getDish(id); return dish ? { title: dish.name, description: `Order ${dish.name} from Addis Eats for ${dish.price} ETB in Addis Ababa.` } : { title: "Dish not found", description: "This menu item is not available." }; }
export default async function DishPage({ params }) { const { id } = await params; const dish = await getDish(id); if (!dish) notFound(); return <main className="shell dish-detail"><p><Link href="/menu">← Back to menu</Link></p><p className="eyebrow">FROM OUR KITCHEN</p><h1>{dish.name}</h1><p>{dish.category}{dish.spicy ? " · Spicy" : ""}</p><h2>{dish.price} ETB</h2><AddToCartButton dish={dish}/></main>; }
