import "server-only";
import { db } from ".";
import { type Prisma } from "@prisma/client";

export async function updateUserByStripeSubscriptionId(
  id: string,
  data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>,
) {
  try {
    return await db.user.update({
      where: { stripeSubscriptionId: id },
      data,
    });
  } catch (error) {
    console.error("Failed to update user by stripe subscription id in database");
    throw error;
  }
}

export async function updateUserById(
  id: string,
  data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>,
) {
  try {
    return await db.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Failed to update user by id in database");
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to get user by id from database");
    throw error;
  }
}

export async function getWaitlistByEmail(email: string) {
  try {
    return await db.waitlist.findUnique({
      where: { email: email },
    });
  } catch (error) {
    console.error("Failed to get waitlist by email from database");
    throw error;
  }
}

export async function createWaitlist(email: string) {
  try {
    return await db.waitlist.create({
      data: {
        email,
      },
    });
  } catch (error) {
    console.error("Failed to create waitlist in database");
    throw error;
  }
}
