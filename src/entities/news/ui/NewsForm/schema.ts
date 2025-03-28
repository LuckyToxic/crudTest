import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters")
    .max(5000, "Content must not exceed 5000 characters")
    .trim(),
  date: yup.string().required(),
});