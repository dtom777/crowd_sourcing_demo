import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryData: Prisma.CategoryCreateInput[] = [
  { name: 'プログラミング', slug: 'programming' },
  { name: 'マーケティング', slug: 'marketing' },
  { name: 'ビジネス', slug: 'business' },
  { name: 'データ', slug: 'data' },
  { name: 'デザイン', slug: 'design' },
  { name: '音楽', slug: 'music' },
  { name: '動画', slug: 'video' },
  { name: 'ライティング', slug: 'writing' },
];

async function main() {
  const categories = await prisma.category.findMany();

  if (categories.length) return;

  await Promise.all(
    categoryData.map(async (category) => {
      await prisma.category.create({
        data: category,
      });
    })
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
