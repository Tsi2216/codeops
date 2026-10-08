import "../styles/globals.css";
import Link from "next/link";
import Footer from "../components/Footer";
import { Providers } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Delicious food from Addis Ababa"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand">Addis Eats</Link>
            <nav aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </div>
        </header>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
