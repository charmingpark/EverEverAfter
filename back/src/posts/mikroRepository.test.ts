import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { createTest } from './createTest';
import { ImageEntity, PostEntity } from './mikroEntity';
import { MikroPostRepository } from './mikroRepository';

let orm: MikroORM<SqliteDriver>;

createTest(
  'MikroPostRepository',
  async () => {
    orm = await MikroORM.init<SqliteDriver>({
      entities: [PostEntity, ImageEntity],
      dbName: 'dev.db',
      type: 'sqlite',
    });

    const em = orm.em.fork();
    await em.createQueryBuilder(ImageEntity).delete();
    await em.createQueryBuilder(PostEntity).delete();
    return MikroPostRepository(em);
  },
  async () => orm.close(),
);
