import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { createTest } from './createTest';
import { ImageEntity, PostEntity } from '../posts/mikroEntity';
import { CommentEntity } from './mikroEntity';
import { MikroCommentRepository } from './mikroRepository';

let orm: MikroORM<SqliteDriver>;

const MEMORY_NAME = ':memory:';

createTest(
  'MikroCommentRepository',
  async () => {
    const dbName = MEMORY_NAME;
    orm = await MikroORM.init<SqliteDriver>({
      entities: [PostEntity, ImageEntity, CommentEntity],
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
    await em.createQueryBuilder(CommentEntity).delete();

    const post = await em.createQueryBuilder(PostEntity).insert({
      message: 'test'
    });

    return {
      repo: MikroCommentRepository(em),
      postId: post.insertId,
    };
  },
  async () => {
    if(orm) {
      await orm.close();
    }
  },
);
