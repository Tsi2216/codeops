"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useCart } from "../app/providers";
import { placeOrder } from "../app/actions";
import { validate } from "../lib/validate";

const initialState = {
  fieldErrors: {},
  error: ""
};

export default function CheckoutForm() {
  const { cart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: ""
  });
  const [touched, setTouched] = useState({});
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const fieldRefs = useRef({});

  const errors = validate(form);
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function show(field) {
    return touched[field] && errors[field];
  }

  useEffect(() => {
    const firstBadField = Object.keys(state.fieldErrors || {})[0];

    if (firstBadField) {
      fieldRefs.current[firstBadField]?.focus();
      setTouched((current) => ({ ...current, [firstBadField]: true }));
    }
  }, [state]);

  return (
    <form action={formAction} onBlur={handleBlur} noValidate>
      {state.error && (
        <p className="failure" role="alert">
          {state.error}
        </p>
      )}

      <input type="hidden" name="total" value={total} />

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          ref={(element) => { fieldRefs.current.name = element; }}
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          aria-invalid={!!show("name")}
          aria-describedby={show("name") ? "name-error" : undefined}
        />
        {show("name") && (
          <p id="name-error" role="alert">{errors.name}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone">TeleBirr phone</label>
        <input
          ref={(element) => { fieldRefs.current.phone = element; }}
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          aria-invalid={!!show("phone")}
          aria-describedby={show("phone") ? "phone-error" : undefined}
        />
        {show("phone") && (
          <p id="phone-error" role="alert">{errors.phone}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="area">Delivery area</label>
        <select
          ref={(element) => { fieldRefs.current.area = element; }}
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          aria-invalid={!!show("area")}
          aria-describedby={show("area") ? "area-error" : undefined}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
        </select>
        {show("area") && (
          <p id="area-error" role="alert">{errors.area}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          ref={(element) => { fieldRefs.current.notes = element; }}
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          aria-invalid={!!show("notes")}
          aria-describedby={show("notes") ? "notes-error" : undefined}
        />
      </div>

      {Object.entries(state.fieldErrors || {}).map(([field, messages]) => (
        <p key={field} role="alert">
          {messages?.[0]}
        </p>
      ))}

      <button type="submit" disabled={pending}>
        {pending ? `Sending…` : `Place Order — ${total} ETB`}
      </button>
    </form>
  );
}
