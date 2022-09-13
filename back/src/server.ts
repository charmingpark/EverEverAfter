import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './createContext';
import { appRouter } from '.';
import cors from '@fastify/cors';

const server = fastify({
  maxParamLength: 100,
  logger: true
});

server.register(cors, {
  origin: ['http://localhost:3000']
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({
      port: 8000
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();