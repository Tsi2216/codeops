import Link from "next/link";
import ClientDishActions from "../../components/ClientDishActions";

export default function DishList({ dishes }) {
  return (
    <div className="dishes">
      {dishes.map((dish) => (
        <article className="dish" data-dish-category={dish.category} key={dish.id}>
          <div className="dish-info">
            <h3><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3>
            <p>{dish.price} ETB</p>
            {dish.spicy && <span>Spicy</span>}
          </div>
          <ClientDishActions dish={dish} />
        </article>
      ))}
    </div>
  );
}
