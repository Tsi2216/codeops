import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell page-home">
      <h1>Welcome to Addis Eats</h1>
      <p>Delicious food from Addis Ababa.</p>
      <Link className="button" href="/menu">View Menu</Link>
    </main>
  );
}
