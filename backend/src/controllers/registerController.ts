import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function registerEvent(userId: number, eventId: number) {
  try {
    const res = await prisma.registered.create({
      data: {
        userId,
        eventId,
      },
    });
    return res;
  } catch (error) {
    console.log("Error registering  for the event", error);
    throw error;
  }
}

export async function unRegisterEvent(userId: number, eventId: number) {
  try {
    const res = await prisma.registered.delete({
      where: {
        userId_eventId: {
          eventId: eventId,
          userId: userId,
        },
      },
    });
    return res;
  } catch (error) {
    console.log("Error Unregistering for the event", error);
    throw error;
  }
}

export async function getAllRegisteredEvents(userId: number) {
  try {
    const res = await prisma.registered.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: {
          select: {
            id:true,
            eventTitle: true,
            description: true,
            date: true,
          },
        },
      },
    });
    const events = res.map((registered) => registered.event);

    return events;
  } catch (error) {
    console.log("Error getting the Registered Events", error);
    throw error;
  }
}
