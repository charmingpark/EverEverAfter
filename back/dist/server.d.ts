import * as trpc from '@trpc/server';
declare const appRouter: import("@trpc/server/dist/declarations/src/router").Router<unknown, unknown, {}, Record<"getUser", import("@trpc/server/dist/declarations/src/internals/procedure").Procedure<unknown, unknown, {}, {
    name: string;
}, {
    name: string;
}, {
    name: string;
} | undefined, unknown, {
    name: string;
} | undefined>>, Record<"createUser", import("@trpc/server/dist/declarations/src/internals/procedure").Procedure<unknown, unknown, {}, {
    name: string;
}, {
    name: string;
}, number, unknown, number>>, {}, trpc.DefaultErrorShape>;
export declare type AppRouter = typeof appRouter;
export {};
