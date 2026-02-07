import { prisma } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/generated/prisma/client";
import { tanstackStartCookies } from 'better-auth/tanstack-start'

// const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", sqlite...etc
    }),
    baseURL: (import.meta.env.DEV ? process.env.VITE_BETTER_AUTH_DEV_URL : process.env.VITE_BETTER_AUTH_PROD_URL),
    // baseURL: import.meta.env.BASE_URL,

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [tanstackStartCookies()],
});