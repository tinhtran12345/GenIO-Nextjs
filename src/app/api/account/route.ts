import { getUser } from '@/actions/getUser';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  const user = await getUser();
}
