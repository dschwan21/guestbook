import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const guestbookRouter = router({
    postMessage: publicProcedure
        .input(
            z.object({
                name: z.string(),
                message: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                console.log('ctx', ctx);
                await ctx.prisma.guestbook.create({
                    data: {
                        name: input.name,
                        message: input.message,
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }),
    });