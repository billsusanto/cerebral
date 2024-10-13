"use server";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail({ email }: { email: string }) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}

export async function createUser(user: {
  name: string;
  email: string;
  phoneNumber: string;
  businessDescription: string;
  welcomeMessage: string;
}) {
  await db.insert(users).values(user);
}
