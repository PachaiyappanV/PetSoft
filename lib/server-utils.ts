import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
};
