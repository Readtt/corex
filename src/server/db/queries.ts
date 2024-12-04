import { Prisma, type TicketStatus } from "@prisma/client";
import "server-only";
import { db } from ".";

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
    console.error(
      "Failed to update user by stripe subscription id in database",
    );
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

export async function isUserAdminById(id: string): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: { isAdmin: true }, // Only select the 'isAdmin' field
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.isAdmin;
  } catch (error) {
    console.error("Failed to check if user is admin in database");
    throw error;
  }
}

// export async function getUserByEmail(email: string) {
//   try {
//     return await db.user.findUnique({
//       where: { email },
//     });
//   } catch (error) {
//     console.error("Failed to get user by email from database");
//     throw error;
//   }
// }

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

export async function updateTicketById(
  id: string,
  data: Prisma.XOR<Prisma.TicketUpdateInput, Prisma.TicketUncheckedUpdateInput>,
) {
  try {
    return await db.ticket.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Failed to update ticket by id in database");
    throw error;
  }
}

export async function createTicket(
  data: Prisma.XOR<Prisma.TicketCreateInput, Prisma.TicketUncheckedCreateInput>,
) {
  try {
    return await db.ticket.create({
      data,
    });
  } catch (error) {
    console.error("Failed to create ticket in database");
    throw error;
  }
}

export async function checkLastTicketWithinTimeframe(
  email: string,
  timeframeInMinutes: number,
) {
  try {
    const lastTicket = await db.ticket.findFirst({
      where: {
        email: email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (lastTicket) {
      const timeDifference =
        new Date().getTime() - lastTicket.createdAt.getTime();
      const timeframeInMillis = timeframeInMinutes * 60 * 1000;

      return timeDifference < timeframeInMillis;
    }

    return false;
  } catch (error) {
    console.error("Failed to check last ticket within timeframe in database");
    throw error;
  }
}

export async function getTicketCount({
  sinceInMinutes,
  statuses,
}: {
  sinceInMinutes?: number;
  statuses?: TicketStatus[]; // Changed to an array of TicketStatus
}) {
  try {
    return await db.ticket.count({
      where: {
        ...(sinceInMinutes && {
          createdAt: {
            gte: new Date(new Date().getTime() - sinceInMinutes * 60000),
          },
        }),
        ...(statuses &&
          statuses.length > 0 && {
            status: {
              in: statuses, // Use 'in' to match multiple statuses
            },
          }),
      },
    });
  } catch (error) {
    console.error("Failed to retrieve ticket count from database");
    throw error;
  }
}

export async function deleteTicketById(id: string) {
  try {
    return await db.ticket.delete({ where: { id } });
  } catch (error) {
    console.error("Failed to delete ticket by id from database");
    throw error;
  }
}


export async function getTicketById(id: string) {
  try {
    return await db.ticket.findFirst({ where: { id } });
  } catch (error) {
    console.error("Failed to get ticket by id from database");
    throw error;
  }
}

export async function getRecentTicketsWithPagination({
  page = 1,
  pageSize = 10,
  filters,
  order,
}: {
  page?: number;
  pageSize?: number;
  filters?: Array<
    [
      keyof Prisma.TicketWhereInput,
      (
        | Array<Prisma.TicketWhereInput[keyof Prisma.TicketWhereInput]>
        | Prisma.TicketWhereInput[keyof Prisma.TicketWhereInput]
      ),
    ]
  >;
  order?: Array<[keyof Prisma.TicketWhereInput, Prisma.SortOrder]>;
}) {
  try {
    const skip = (page - 1) * pageSize;
    const where: Prisma.TicketWhereInput = filters
      ? Object.fromEntries(
          filters.map(([key, values]) => [
            key,
            Array.isArray(values)
              ? { in: values }
              : { contains: values, mode: "insensitive" },
          ]),
        )
      : {};
      console.log(where);
    const orderBy: Prisma.TicketFindManyArgs["orderBy"] =
      order && order.length > 0
        ? Object.fromEntries(order)
        : { createdAt: Prisma.SortOrder.desc };

    console.log(where);

    const tickets = await db.ticket.findMany({
      skip,
      take: pageSize,
      orderBy,
      where,
    });

    const totalRecords = await db.ticket.count({
      where,
    });

    return {
      tickets,
      currentPage: page,
      pageSize,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
    };
  } catch (error) {
    console.error(
      "Failed to retrieve recent tickets with pagination from database",
    );
    throw error;
  }
}

export async function getRecentTickets({
  count,
  statuses,
}: {
  count?: number;
  statuses?: TicketStatus[]; // Changed to an array of TicketStatus
}) {
  try {
    return await db.ticket.findMany({
      take: count, // Limit to the specified number of tickets
      orderBy: {
        updatedAt: "desc", // Sort by updatedAt in descending order (most recent first)
      },
      where: {
        ...(statuses &&
          statuses.length > 0 && {
            status: {
              in: statuses, // Use 'in' to match multiple statuses
            },
          }),
      },
    });
  } catch (error) {
    console.error("Failed to retrieve recent tickets from database");
    throw error;
  }
}

export async function getTicketCountLastMonths(monthsAgo: number) {
  try {
    const dateFrom = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - monthsAgo); // Adjust to the number of months ago

    const ticketsPerDay = await db.ticket.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: dateFrom,
        },
      },
      _count: {
        id: true, // Assuming 'id' is the unique identifier for tickets
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    interface TicketGroup {
      date: string;
      tickets: number;
    }

    const ticketGroups: TicketGroup[] = ticketsPerDay.map((ticket) => ({
      date:
        ticket.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) ?? "", // Extract date part (YYYY-MM-DD) in en-US
      tickets: ticket._count.id,
    }));

    const result = Object.values(
      ticketGroups.reduce<Record<string, TicketGroup>>((acc, ar) => {
        if (acc[ar.date]) {
          acc[ar.date]!.tickets += ar.tickets;
        } else {
          acc[ar.date] = { ...ar };
        }

        return acc;
      }, {}),
    );

    // Compress and map chart data
    return result;
  } catch (error) {
    console.error(
      "Failed to retrieve ticket count from last months in database",
    );
    throw error;
  }
}
