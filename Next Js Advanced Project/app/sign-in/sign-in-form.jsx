"use client";
import { useActionState } from "react";
import { signIn } from "../actions";
export function SignInForm() {
 const [state, action, pending] = useActionState(signIn, {});
 return <form action={action} className="sign-in-form"><label>Email<input name="username" type="email" required autoComplete="username" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label>{state?.error && <p role="alert" className="failure">{state.error}</p>}<button disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button></form>;
}
