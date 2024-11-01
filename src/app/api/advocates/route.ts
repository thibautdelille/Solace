import db from '@/db';
import { advocates } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  const searchPattern = search ? `%${search}%` : '';

  const data = await db
    .select()
    .from(advocates)
    .where(
      search
        ? sql`${advocates.firstName} ILIKE ${searchPattern} OR 
          ${advocates.lastName} ILIKE ${searchPattern} OR 
          ${advocates.city} ILIKE ${searchPattern} OR 
          ${advocates.degree} ILIKE ${searchPattern} OR 
          ${advocates.specialties}::text ILIKE ${searchPattern} OR 
          CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${searchPattern} OR 
          CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${searchPattern}`
        : sql`1=1`
    );

  return Response.json({ data });
}
