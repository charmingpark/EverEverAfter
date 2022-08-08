"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fastify_1 = require("@trpc/server/adapters/fastify");
const fastify_2 = tslib_1.__importDefault(require("fastify"));
const context_1 = require("./context");
const router_1 = require("./router");
const cors_1 = tslib_1.__importDefault(require("@fastify/cors"));
const server = (0, fastify_2.default)({
    maxParamLength: 100,
    logger: true
});
server.register(cors_1.default, {
    origin: ['http://localhost:3000']
});
server.register(fastify_1.fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: router_1.appRouter, createContext: context_1.createContext },
});
(async () => {
    try {
        await server.listen({
            port: 5000
        });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map