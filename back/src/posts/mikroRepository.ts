import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { invariant } from '../invariant';
import { PostEntity, ImageEntity } from './mikroEntity';
import { PostRepository } from './repository';

export function MikroPostRepository(
  em: MikroORM<SqliteDriver>['em']
): PostRepository {
  const postRepo = em.getRepository(PostEntity);
  // const imageQuery = orm.em.createQueryBuilder(ImageEntity, 'img');
  const imageRepo = em.getRepository(ImageEntity);

  return {
    async has(id) {
      const result = await postRepo.count({ id });
      return result === 1;
    },
    async all() {
      const posts = await postRepo.findAll({ populate: true });

      return posts.map(post => ({
        ...post,
        images: post.images.getItems().map(image => image.src)
      }));
    },
    async add(newPost) {
      const post = new PostEntity(newPost.message);
      const images = newPost.images.map(src => new ImageEntity(src, post));
      
      imageRepo.persist(images);
      await postRepo.persistAndFlush(post);
    },
    async delete(targetId) {
      await em.createQueryBuilder(ImageEntity)
        .delete()
        .where({ post: targetId });

      await em.flush();

      await em.createQueryBuilder(PostEntity)
        .delete()
        .where({ id: targetId });
    },
    async modify({ targetId, newMessage }) {
      const post = await postRepo.findOne({ id: targetId });

      invariant(post !== null, 'post가 존재하지 않습니다');
      post.message = newMessage;

      await postRepo.flush();
    },
  };
}
