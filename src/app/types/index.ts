import { z } from "zod";
export const SessionPayload = z.object({
  userId: z.string(),
  expiresAt: z.date(),
});

export type SessionPayload = z.infer<typeof SessionPayload>;
