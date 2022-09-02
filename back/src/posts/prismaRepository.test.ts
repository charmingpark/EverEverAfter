import { PrismaClient } from '@prisma/client';
import { PrismaPostRepo } from './prismaRepository';
import { createTest } from './createTest';

let prisma: PrismaClient;

createTest(
  'PrismaPostRepo',
  async () => {
    prisma = new PrismaClient();
    await prisma.image.deleteMany();
    await prisma.post.deleteMany();
    return PrismaPostRepo(prisma);
  },
  async () => {
    await prisma.$disconnect();
  },
);
