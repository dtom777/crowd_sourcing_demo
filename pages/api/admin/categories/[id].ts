import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';

const fetchCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const category: Category = await prisma.category.findUnique({
        where: { id: Number(id) },
      });
      console.log('GET', category);
      res.status(200).json(category);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'PUT') {
    const body = req.body;
    delete body['createdAt'];
    console.log('BODY', body);
    try {
      const updateCategory: Category = await prisma.category.update({
        where: { id: Number(id) },
        data: { ...req.body, updatedAt: new Date() },
      });
      console.log('UPDATE', updateCategory);
      res.status(200).json(updateCategory);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleteCategory: Category = await prisma.category.delete({
        where: { id: Number(id) },
      });
      console.log('DELETE', deleteCategory);
      res.status(200).json(deleteCategory);
    } catch (err) {
      console.log('ERROR:', err.message);
    }
  }
};
export default fetchCategory;
