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
      dbName: ':memory:',
      type: 'sqlite',
    });
    //테이블 생성
    if (dbName === ':memory:'){
      const generator = orm.getSchemaGenerator();
      // console.log(await generator.getCreateSchemaSQL()) // SQL문 자동 생성
      await generator.createSchema();
    }
    // em = entity manager
    const em = orm.em.fork();

    const post = await em.createQueryBuilder(PostEntity)
      .insert({ message: 'test' });

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
