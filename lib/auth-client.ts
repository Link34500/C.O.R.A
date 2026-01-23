import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({});

export const { signIn, signUp, signOut, useSession } = authClient;
const discordSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "discord",
  });
};
