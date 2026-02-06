import z from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    // email: z.string().email(),
    password: z.string().min(1, { message: "Field is required" }),
})

export const signupSchema = z.object({
    fullName: z.string().min(5).max(50),
    // email: z.string().email(),
    email: z.email().max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This specifies which field the error message belongs to
})