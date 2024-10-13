"use server";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail({ email }: { email: string }) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}

export async function createUser(userInput: {
  name: string;
  email: string;
  phoneNumber: string;
  businessDescription: string;
  welcomeMessage: string;
}) {
  const [user] = await db
    .insert(users)
    .values(userInput)
    .returning({ id: users.id });

  return user;
}

export async function getListenerStatus({ userId }: { userId: string }) {
  const [user] = await db
    .select({ status: users.listenerStatus })
    .from(users)
    .where(eq(users.id, userId));

  return user?.status;
}