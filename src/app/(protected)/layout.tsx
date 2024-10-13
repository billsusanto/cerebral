import { currentUser } from "@clerk/nextjs/server";
import { getUserByEmail } from "~/actions/user";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email = clerkUser?.emailAddresses[0]?.emailAddress as string;
  const user = await getUserByEmail({ email });
  if (!user) {
    redirect("/setup");
  }

  const status = user.listenerStatus;
  if (status !== "RUNNING") {
    redirect(`/connect/${user.id}`);
  }

  return <>{children}</>;
}
