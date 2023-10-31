import { z } from 'zod';

export const BookValidator = z.object({
  title: z.string().min(5),
  price: z.number().min(1),
});
