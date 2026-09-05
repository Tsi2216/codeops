function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const found = state.find((item) => item.id === action.item.id);

      if (found) {
        return state.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.item, quantity: 1 }];
    }

    case "remove": {
      const found = state.find((item) => item.id === action.item.id);

      if (!found) {
        return state;
      }

      if (found.quantity === 1) {
        return state.filter((item) => item.id !== action.item.id);
      }

      return state.map((item) =>
        item.id === action.item.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    case "clear":
      return [];

    default:
      return state;
  }
}

export default cartReducer;
