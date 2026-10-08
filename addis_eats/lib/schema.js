const areas = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

function validateOrder(input) {
  const fieldErrors = {};
  const value = {
    name: typeof input?.name === "string" ? input.name.trim() : "",
    phone: typeof input?.phone === "string" ? input.phone : "",
    area: typeof input?.area === "string" ? input.area : "",
    notes: typeof input?.notes === "string" ? input.notes : ""
  };

  if (!value.name) {
    fieldErrors.name = ["Name is required."];
  }

  if (!/^09\d{8}$/.test(value.phone)) {
    fieldErrors.phone = ["Enter a valid TeleBirr phone number."];
  }

  if (!areas.includes(value.area)) {
    fieldErrors.area = ["Choose a delivery area."];
  }

  return { value, fieldErrors };
}

export const orderSchema = {
  safeParse(input) {
    const { value, fieldErrors } = validateOrder(input);

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        error: {
          flatten() {
            return { fieldErrors };
          }
        }
      };
    }

    return { success: true, data: value };
  }
};
