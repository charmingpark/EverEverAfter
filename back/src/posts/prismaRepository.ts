// import { Post, PrismaClient } from '@prisma/client';
// import { PostRepository } from './repository';
// import { PostT } from './schema';

// type PostWithImages = Post & { images: { src: string }[] };

// function process(post: PostWithImages): PostT {
//   return {
//     ...post,
//     images: post.images.map(image => image.src)
//   };
// }

// function processMany(posts: PostWithImages[]): PostT[]{
//   return posts.map(process);
// }

// export function PrismaPostRepo(
//   client: Pick<PrismaClient, 'post' | 'image'>
// ): PostRepository {
//   return {
//     async has(id) {
//       return client.post.count({
//         where: {
//           id,
//         }
//       }).then(v => v === 1);
//     },
//     async all() {
//       return client.post.findMany({
//         include: {
//           images: {
//             select: {
//               src: true
//             }
//           }
//         }
//       })
//         .then(processMany);
//     },
//     async add(newPost) {
//       await client.post.create({
//         data: {
//           message: newPost.message,
//           images: {
//             create: newPost.images.map(src => ({ src }))
//           }
//         }
//       });
//     },
//     async delete(targetId) {
//       await client.image.deleteMany({
//         where: {
//           postId: targetId,
//         },
//       });
    
//       await client.post.delete({
//         where: {
//           id: targetId,
//         },
//       });
//     },
//     async modify({ targetId, newMessage }) {
//       await client.post.update({
//         where: {
//           id: targetId,
//         },
//         data: {
//           message: newMessage
//         }
//       });
//     },
//   };
// }
