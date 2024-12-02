import { z } from "zod";

export const ticketProblems = [
  "General Inquiries",
  "Billing",
  "Account Management",
  "Feature Request",
  "Bugs/Issues",
] as const;

export const ticketSeverity = ["Low", "Normal", "High", "Urgent"] as const;

// If you want to change this, you should also change it in tRPC createTicket
export const ticketFormSchema = z.object({
  email: z.string().email(),
  problem: z.enum(ticketProblems),
  severity: z.enum(ticketSeverity),
  subject: z
    .string()
    .min(3, "Subject must contain at least 3 characters")
    .max(30, "Subject must be less than 30 characters"),
  description: z
    .string()
    .min(10, "Description must contain at least 10 characters")
    .max(300, "Description must be less than 300 characters"),
});

export const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must only contain alphabetic characters and spaces (no numbers or special characters).",
    }),
});