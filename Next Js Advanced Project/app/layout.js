import "../styles/globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.example.com";
export const metadata = { metadataBase: new URL(siteUrl), title: { default: "Addis Eats | Ethiopian food, delivered", template: "%s | Addis Eats" }, description: "Order Ethiopian favourites from Addis Eats, with delivery across Addis Ababa.", openGraph: { title: "Addis Eats", description: "Ethiopian favourites delivered across Addis Ababa.", url: "/", siteName: "Addis Eats", images: [{ url: "/social-card.svg", width: 1200, height: 630, alt: "Addis Eats — Ethiopian food delivered" }], locale: "en_US", type: "website" }, twitter: { card: "summary_large_image", title: "Addis Eats", description: "Ethiopian favourites delivered across Addis Ababa.", images: ["/social-card.svg"] } };
export default function RootLayout({ children }) { return <html lang="en"><body className={inter.className}><header className="site-header"><div className="shell header-inner"><Link href="/" className="brand">Addis Eats</Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/menu">Menu</Link><Link href="/cart">Cart</Link><Link href="/orders">Orders</Link><Link href="/checkout">Checkout</Link><Link href="/sign-in">Sign in</Link></nav></div></header><Providers>{children}</Providers><Footer /></body></html>; }
