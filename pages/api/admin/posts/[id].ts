import { prisma } from '@/lib/prisma';
import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PostWithUserAndTags } from 'types/post.type';
import { getAsString } from '../../../../utils/getAsString';

const fetchPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getAsString(req.query.id);

  if (req.method === 'GET') {
    try {
      const findPost: PostWithUserAndTags = await prisma.post.findUnique({
        where: { id },
        include: {
          user: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      const post = {
        ...findPost,
        tags: findPost.tags.map((tag) => tag.tag),
      };
      console.log('GET', post);
      res.status(200).json(post);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'PUT') {
    const body = req.body;
    const tagArray = req.body.tags.map((tag) => tag.name);
    console.log('tagArray', tagArray);
    delete body['createdAt'];
    delete body['user'];
    delete body['Category'];
    delete body['tags'];
    const findPost = await prisma.post.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const originTagArray = findPost.tags.map((tag) => tag.tag.name);
    const originTagId = findPost.tags.map((tag) => tag.tag.id);
    console.log('originTagArray', originTagArray);
    console.log('originTagId', originTagId);

    try {
      const tags = await prisma.tag.findMany({
        where: {
          name: {
            in: tagArray,
          },
        },
      });

      const tagName = tags.map((tag) => tag.name);
      const tagId = tags.map((tag) => tag.id);
      console.log('tagId(残したい)', tagId);
      console.log('tagName', tagName);
      const newTagArray = tagArray.filter((i) => tagName.indexOf(i) == -1);
      console.log('newTagArray', newTagArray);
      console.log('newTagArray.length', newTagArray.length);
      const difTagId = originTagId.filter((i) => tagId.indexOf(i) == -1);
      console.log('difTagId(いらん)', difTagId);
      const difOriginTagId = tagId.filter((i) => originTagId.indexOf(i) == -1);
      console.log('difOriginTagId', difOriginTagId);

      if (tagArray[0] === '') {
        console.log('タグないよ！');
        delete req.body['tags'];
        const updatePost = await prisma.post.update({
          where: { id },
          data: {
            ...req.body,
            reward: Number(req.body.reward),
            updatedAt: new Date(),
            tags: {
              deleteMany: {},
            },
          },
        });
        console.log('updatePost', updatePost);

        return res.status(200).json(updatePost);
      }

      if (newTagArray.length === 0) {
        if (originTagArray.length > tagArray.length) {
          console.log('③');
          const updateTagsOnPosts = await prisma.tagsOnPosts.deleteMany({
            where: {
              AND: [
                { postId: id },
                {
                  OR: difTagId.map((id) => {
                    return { tagId: id };
                  }),
                },
              ],
            },
          });
          console.log('updateTagsOnPosts', updateTagsOnPosts);
          res.status(200).json(updateTagsOnPosts);
        } else if (originTagArray.length < tagArray.length) {
          console.log('⑤');
          const updatePost = await prisma.post.update({
            where: { id },
            data: {
              reward: Number(req.body.reward),
              updatedAt: new Date(),
              tags: {
                create: difOriginTagId.map((id) => {
                  return { tag: { connect: { id } } };
                }),
              },
            },
          });
          res.status(200).json(updatePost);
        } else {
          console.log('④');
          delete req.body.tags;
          const updatePost = await prisma.post.update({
            where: { id },
            data: {
              ...req.body,
              reward: Number(req.body.reward),
              updatedAt: new Date(),
            },
          });
          res.status(200).json(updatePost);
        }
      } else if (
        newTagArray.filter((i) => tagArray.indexOf(i) != -1) &&
        newTagArray.length === tagArray.length
      ) {
        console.log('②');
        await prisma.tagsOnPosts.deleteMany({
          where: {
            AND: [
              { postId: id },
              {
                OR: difTagId.map((id) => {
                  return { tagId: id };
                }),
              },
            ],
          },
        });
        const updatePost = await prisma.post.update({
          where: { id },
          data: {
            ...req.body,
            reward: Number(req.body.reward),
            updatedAt: new Date(),
            tags: {
              create: newTagArray.map((tag) => {
                return { tag: { create: { name: tag } } };
              }),
            },
          },
        });
        res.status(200).json(updatePost);
      } else if (
        newTagArray.filter((i) => tagArray.indexOf(i) != -1) &&
        newTagArray.length !== tagArray.length
      ) {
        console.log('⑥');
        await prisma.post.update({
          where: { id },
          data: {
            ...req.body,
            tags: {
              create: newTagArray.map((tag) => {
                return { tag: { create: { name: tag } } };
              }),
            },
          },
        });
        const updatePost = await prisma.post.update({
          where: { id },
          data: {
            tags: {
              create: tagId.map((id) => {
                return { tag: { connect: { id } } };
              }),
            },
          },
        });
        res.status(200).json(updatePost);
      } else {
        console.log('①');
        const updatePost = await prisma.post.update({
          where: { id },
          data: {
            ...req.body,
            reward: Number(req.body.reward),
            updatedAt: new Date(),
            tags: {
              create: newTagArray.map((tag) => {
                return { tag: { create: { name: tag } } };
              }),
            },
          },
        });
        res.status(200).json(updatePost);
      }
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletePost: Post = await prisma.post.delete({
        where: { id },
      });

      console.log('DELETE', deletePost);
      res.status(200).json(deletePost);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default fetchPost;
