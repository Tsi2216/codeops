import { orderSchema } from "./schema";

export function validate(form) {
  const result = orderSchema.safeParse(form);

  if (result.success) {
    return {};
  }

  return result.error.flatten().fieldErrors;
}
