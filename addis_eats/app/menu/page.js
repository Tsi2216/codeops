import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import FilterShell from "../../components/FilterShell";
import { getDishes } from "../../lib/data";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h1>Our Menu</h1>
      <CategoryBar />
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
