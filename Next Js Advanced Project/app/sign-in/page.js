import { SignInForm } from "./sign-in-form";
export const metadata = { title: "Sign in | Addis Eats", description: "Sign in to view your Addis Eats orders and checkout securely." };
export default function SignInPage() { return <main className="shell"><h1>Sign in</h1><p>Demo account: any email and password <code>addiseats-demo</code>.</p><SignInForm /></main>; }
