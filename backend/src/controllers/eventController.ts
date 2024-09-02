import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface NewEventType {
  eventTitle: string;
  description: string;
  date: Date;
  organizerId: number;
}

interface UpdateEventType {
  id: number;
  eventTitle?: string;
  description?: string;
  date?: Date;
}

export async function createNewEvent({
  eventTitle,
  description,
  date,
  organizerId,
}: NewEventType) {
  try {
    const res = await prisma.event.create({
      data: {
        eventTitle,
        description,
        date,
        organizerId,
      },
    });
    return res;
  } catch (error) {
    console.log("Error Creating Event:", error);
    throw new Error("Failed to create event");
  }
}

export async function updateEvent({
  id,
  eventTitle,
  description,
  date,
}: UpdateEventType) {
  const data: Partial<{
    eventTitle: string;
    description: string;
    date: Date;
  }> = {};

  if (eventTitle !== undefined) {
    data.eventTitle = eventTitle;
  }
  if (description !== undefined) {
    data.description = description;
  }
  if (date !== undefined) {
    data.date = date;
  }

  try {
    const res = await prisma.event.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res;
  } catch (error) {
    console.log("Error Updating Event", error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    const res = await prisma.event.findMany();
    return res;
  } catch (error) {
    console.log("Error Fetching Events", error);
    throw error;
  }
}

export async function getEventById(id: number) {
  try {
    const res = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        organiser: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.log("Error getting Event", error);
    throw error;
  }
}

export async function deleteEvent(id: number) {
  try {
    const res = await prisma.event.delete({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log("Error deleting Event", error);
    throw error;
  }
}

export async function getAllEventsByUserID(id: number) {
  try {
    const res = await prisma.event.findMany({
      where: {
        organizerId: id,
      },
    });
    return res;
  } catch (error) {
    console.log("Error fetching user's events", error);
    throw error;
  }
}
