import Dish from "./Dish";

function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Delicious food from Addis Ababa</p>
    </header>
  );
}

function App() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wot",
      price: 250,
    },
    {
      id: 2,
      name: "Tibs",
      price: 300,
    },
    {
      id: 3,
      name: "Shiro",
      price: 180,
    },
    {
      id: 4,
      name: "Kitfo",
      price: 350,
    },
  ];

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="menu">
          {dishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;