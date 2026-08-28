import React from "react";
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <article className="dish">
      <div className="dish-info">
        <h3>{name}</h3>
        {spicy === true && <span className="spicy-badge">Spicy</span>}
      </div>
      <p className="price">{currency} {price}</p>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string
};

export default Dish;
