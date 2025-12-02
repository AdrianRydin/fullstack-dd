import { z } from "zod";
import type {
  CheckoutErrors,
  PersonalInfo,
} from "../features/review/reviewStore";

export const reviewSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(2, "Name is required"),
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(5, "Phone is required"),
  }),
  deliveryMethod: z.string().min(1, "Choose a delivery method"),
  paymentMethod: z.string().min(1, "Choose a payment method"),
});

export function validateOrder(data: {
  personalInfo: PersonalInfo;
  deliveryMethod: string;
  paymentMethod: string;
}): { valid: boolean; errors: CheckoutErrors } {
  const result = reviewSchema.safeParse(data);
  const errors: CheckoutErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const last = issue.path[issue.path.length - 1];
      const key = String(last) as keyof CheckoutErrors;
      errors[key] = issue.message;
    });
    return { valid: false, errors };
  }

  return { valid: true, errors: {} };
}
