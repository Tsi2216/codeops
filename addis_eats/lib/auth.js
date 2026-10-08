import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("demo-user-id")?.value;

  if (!userId) {
    return { id: "demo-user" };
  }

  return { id: userId };
}
