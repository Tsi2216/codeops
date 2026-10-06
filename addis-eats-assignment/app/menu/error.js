"use client";

export default function Error({ reset }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading the menu.</p>
      <button type="button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
