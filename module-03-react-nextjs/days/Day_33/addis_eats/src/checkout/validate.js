export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!/^(09\d{8}|\+2519\d{8})$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid TeleBirr number, such as 0912345678.";
  }

  if (!form.area.trim()) {
    errors.area = "Enter your delivery area.";
  }

  return errors;
}