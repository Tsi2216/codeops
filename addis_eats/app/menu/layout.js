import Link from "next/link";
import MenuCounter from "../../components/MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="shell menu-layout">
      <aside className="menu-sidebar">
        <h2>Menu</h2>
        <MenuCounter />
        <nav aria-label="Menu navigation">
          <Link href="/menu">All dishes</Link>
          <Link href="/menu/1">Doro Wat</Link>
          <Link href="/menu/2">Misir Wat</Link>
          <Link href="/menu/3">Tibs</Link>
          <Link href="/menu/4">Injera</Link>
        </nav>
      </aside>
      <section className="menu-content">{children}</section>
    </div>
  );
}
