"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="dashboard">
          <section className="error-state" role="alert">
            <h1>Something went wrong</h1>
            <p>We could not load this page. Please try again.</p>
            <button type="button" onClick={() => reset()}>Try again</button>
          </section>
        </main>
      </body>
    </html>
  );
}
