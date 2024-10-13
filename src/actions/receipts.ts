"use server";

import { db } from "~/server/db";
import { receipts } from "~/server/db/schema";
import { eq } from "drizzle-orm";

// Fetch all receipts by email
export async function getAllReceiptsByUserId(userId: string) {
  try {
    return await db.select().from(receipts).where(eq(receipts.userId, userId));
  } catch (error) {
    console.error("Error fetching all receipts:", error);
    throw error;
  }
}

// Fetch a receipt by ID
export async function getReceiptById(id: number) {
  try {
    return await db.select().from(receipts).where(eq(receipts.id, id));
  } catch (error) {
    console.error(`Error fetching receipt with id ${id}:`, error);
    throw error;
  }
}

// // Fetch receipts by user ID
// export async function getReceiptsByUserId(userId: number) {
//   try {
//     return await db.select().from(receipts).where({ user_id: userId });
//   } catch (error) {
//     console.error(`Error fetching receipts for user ${userId}:`, error);
//     throw error;
//   }
// }

// // Fetch receipts within a date range
// export async function getReceiptsByDateRange(startDate: string, endDate: string) {
//   try {
//     return await db
//       .select()
//       .from(receipts)
//       .where('date', '>=', startDate)
//       .where('date', '<=', endDate);
//   } catch (error) {
//     console.error(`Error fetching receipts between ${startDate} and ${endDate}:`, error);
//     throw error;
//   }
// }
