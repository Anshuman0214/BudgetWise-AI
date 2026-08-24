import { z } from "zod";

export const reportSchema = z.object({
  body: z.object({ period: z.enum(["monthly", "quarterly", "annual"]) })
});
