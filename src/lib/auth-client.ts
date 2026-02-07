import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  // baseURL: process.env.BASE_URL,
  baseURL: (import.meta.env.DEV ? process.env.VITE_BETTER_AUTH_DEV_URL : process.env.VITE_BETTER_AUTH_PROD_URL)
});

export default authClient;
export const { signIn, signUp, useSession, signOut } = authClient
