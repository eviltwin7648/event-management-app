import * as z from "zod";

export const eventSchema = z.object({
  eventTitle: z.string().min(1, "Event Title is Required"),
  description: z.string().optional(),
  date: z.date(),
  organizerId: z.number(),
});

export const updateEventSchema = z.object({
  eventTitle: z.string().min(1, "Event Title is Required").optional(),
  description: z.string().optional(),
  date: z.date().optional(),
});
