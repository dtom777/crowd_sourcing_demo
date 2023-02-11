import { prisma } from '@/lib/prisma';
import { Tag, Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PostWithTags } from '../../../types/post.type';

const updatePostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // ①新しいタグだけのとき
  //   newTagArray.length !== 0
  //   =>newTagArrayをcreate
  // ②既存のタグが新しいタグに置き換わるとき
  //   tagArray === newTagArray (完全一致)
  //   =>newTagArrayをcreate　かつ　originTagArrayをdisconnect
  // ③タグが３つから１つに減るとき（例: a ,b , c => c）
  //   originTagArray.length > tagArray.length && newTagArray.length === 0
  //   =>originTagArrayとtagArrayの差分(originTagIdとtagIdの差分のId)をdisconnect
  // ④新しいタグがないとき かつ タグがそのままのとき
  //   newTagArray.length === 0
  //   =>req.body.tagsを消すだけ
  // ⑤新しいタグがないとき かつ 増えるタグが既存タグのとき
  //   newTagArray.length === 0 && すでにあるtag
  // 　=>originTagArrayと既存タグの差分をconnect
  // ⑥新しいタグがある かつ 既存タグがそのままのとき
  // 　②の完全一致ではないとき （①も含まれるかも

  const { id }: { id: string } = req.body;
  const findPost: PostWithTags = await prisma.post.findUnique({
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

  const tagArray = req.body.tags.trim().split(/\s+/);
  console.log('tagArray', tagArray);

  try {
    const tags: Array<Tag> = await prisma.tag.findMany({
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
      const updatePost: Post = await prisma.post.update({
        where: { id },
        data: {
          ...req.body,
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
        const updatePost: Post = await prisma.post.update({
          where: { id },
          data: {
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
        const updatePost: Post = await prisma.post.update({
          where: { id },
          data: { ...req.body },
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
      const updatePost: Post = await prisma.post.update({
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
      const updatePost: Post = await prisma.post.update({
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
      res.status(200).json(updatePost);
    }
  } catch (err) {
    console.log('ERROR:', err.message);
  }
};
export default updatePostHandler;
