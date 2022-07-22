import * as Yup from "yup";

export const validationSchema = Yup.object({
  fullName: Yup.string().max(15, "Must be 15 characters or less").required(),
  cardNumber: Yup.string().min(15).length(16).required(),
  expirationMonth: Yup.string().required(),
  expirationYear: Yup.string().required(),
  cvv: Yup.string().min(3).length(3).required(),
});
