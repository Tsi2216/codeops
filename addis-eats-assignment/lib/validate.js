export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^09\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid TeleBirr phone number.";
  }

  if (!["Bole", "Kazanchis", "Megenagna", "Piassa"].includes(form.area)) {
    errors.area = "Choose a delivery area.";
  }

  return errors;
}
