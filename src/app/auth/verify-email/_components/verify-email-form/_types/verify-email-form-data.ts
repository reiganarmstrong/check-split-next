import z from "zod";

export const verifyEmailFormSchema = z.object({
  email: z.email("Invalid email address"),
  code: z.string().min(1, "Verification code is required"),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailFormSchema>;
