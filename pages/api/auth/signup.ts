import { hashPassword } from 'utils/auth';
import { prisma } from '@/lib/prisma';

const handler = async (req, res) => {
  // ①method validation
  if (req.method !== 'POST') {
    return;
  }
  console.log('BODY', req.body);

  const { email, password } = req.body;

  // ②data validation
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });

    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // ③existingUser validation
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });

    return;
  }

  // ④hashedPassword
  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: 'Created user!' });
};

export default handler;
