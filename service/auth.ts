import { Scalekit, User } from "@scalekit/node";
import { cookies } from 'next/headers';

export const scalekit = new Scalekit(
  process.env.SCALEKIT_ENV_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!
)

export const getUser = async (): Promise<{ user: User | null }> => {
  const user = cookies().get("user")?.value;
  if (!user) {
    return { user: null }
  }

  return {
    user: JSON.parse(user)
  }
}

export const logOutUser = async (): Promise<void> => {
  cookies().delete("user");
  cookies().delete("accessToken");
}