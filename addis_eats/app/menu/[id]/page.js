import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "../../../components/AddToCartButton";
import { getDish, getDishes } from "../../../lib/data";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <p><Link href="/menu">Back to menu</Link></p>
      <h1>{dish.name}</h1>
      <p>{dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      {dish.spicy && <p>Spicy</p>}
      <AddToCartButton dish={dish} />
    </main>
  );
}
