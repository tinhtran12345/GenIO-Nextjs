'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';
export async function getExtractions() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Cannot authenticate user');
  }

  const userUUID = session.user.id;
  const currentExtractions = await prisma.extraction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      user: {
        id: userUUID,
      },
      NOT: {
        status: Status.PROCESSED,
      },
    },
  });

  const finishedExtractions = await prisma.extraction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      user: {
        id: userUUID,
      },
      status: Status.PROCESSED,
    },
  });

  return {
    currentExtractions,
    finishedExtractions,
  };
}
