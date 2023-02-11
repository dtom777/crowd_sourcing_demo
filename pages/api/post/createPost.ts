import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post, Tag } from '@prisma/client';

const createPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('REQ', req);
  // タグがないとき
  if (!req.body.tags.trim()) {
    console.log('タグないよ！');
    const body = req.body;
    delete body['tags'];
    const resultPost: Post = await prisma.post.create({
      data: {
        ...body,
      },
    });
    res.status(200).json(resultPost);
  } else {
    // タグがあるとき
    // ①タグをスペースごとに切ってタグ配列にする
    const tagArray = req.body.tags.trim().split(/\s+/);

    // ②タグ配列の要素と一致するタグがすでにあるか確認
    try {
      const tags: Array<Tag> = await prisma.tag.findMany({
        where: {
          name: {
            in: tagArray,
          },
        },
      });
      // ③タグ配列の要素と一致するタグがすでにあった場合は、まず一致しないものだけで新しいタグ配列を作る
      const tagName = tags.map((tag) => tag.name);
      const newTagArray = tagArray.filter((i) => tagName.indexOf(i) == -1);
      // ④新しいタグ配列を使ってPostをcreateする
      const resultPost: Post = await prisma.post.create({
        data: {
          ...req.body,
          tags: {
            create: newTagArray.map((tag) => {
              return { tag: { create: { name: tag } } };
            }),
          },
        },
      });

      if (tags.length === 0) {
        // ④タグ配列の要素と一致するタグがすでにない場合は③のPostを返して終わり
        res.status(200).json(resultPost);
      } else {
        // ⑤タグ配列の要素と一致するタグがすでにあった場合は、一致するタグとPostをconnectする
        const updatePost: Post = await prisma.post.update({
          where: { id: resultPost.id },
          data: {
            tags: {
              create: tags.map((tag) => {
                return { tag: { connect: { id: tag.id } } };
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
};
export default createPostHandler;
