import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { createTest } from './createTest';
import { ImageEntity, PostEntity } from './mikroEntity';
import { MikroPostRepository } from './mikroRepository';

let orm: MikroORM<SqliteDriver>;

const MEMORY_NAME = ':memory:';

createTest(
  'MikroPostRepository',
  async () => {
    const dbName = MEMORY_NAME;
    orm = await MikroORM.init<SqliteDriver>({
      entities: [PostEntity, ImageEntity],
      dbName,
      type: 'sqlite',
    });

    if (dbName === ':memory:'){
      const generator = orm.getSchemaGenerator();
      await generator.createSchema();
    }
    
    const em = orm.em.fork();
    await em.createQueryBuilder(ImageEntity).delete();
    await em.createQueryBuilder(PostEntity).delete();
    return MikroPostRepository(em);
  },
  async () => orm.close(),
);
