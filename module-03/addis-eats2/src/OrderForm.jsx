import React, { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: ""
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const phoneIsValid = /^09\d{8}$/.test(form.phone);

  function handleSubmit(event) {
    event.preventDefault();

    if (!phoneIsValid) {
      return;
    }

    alert("Order placed successfully");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delivery Details</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />

      <label>Phone (TeleBirr)</label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter your TeleBirr number"
      />

      {!phoneIsValid && form.phone !== "" && (
        <p className="error">Please enter a valid TeleBirr number.</p>
      )}

      <label>Area</label>
      <input
        type="text"
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Enter your area"
      />

      <button
        type="submit"
        disabled={!form.name || !phoneIsValid || !form.area}
      >
        Place Order
      </button>
    </form>
  );
}

export default OrderForm;
