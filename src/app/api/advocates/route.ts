import db from '@/db';
import { advocates } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  const page = request.nextUrl.searchParams.get('page');
  const pageSize = request.nextUrl.searchParams.get('pageSize');
  const searchPattern = search ? `%${search}%` : '';

  // set the db query
  const searchQuery = search
    ? sql`${advocates.firstName} ILIKE ${searchPattern} OR 
          ${advocates.lastName} ILIKE ${searchPattern} OR 
          ${advocates.city} ILIKE ${searchPattern} OR 
          ${advocates.degree} ILIKE ${searchPattern} OR 
          ${advocates.specialties}::text ILIKE ${searchPattern} OR 
          CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${searchPattern} OR 
          CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${searchPattern}`
    : sql`1=1`;

  const data = await db
    .select()
    .from(advocates)
    .where(searchQuery)
    .limit(pageSize ? parseInt(pageSize) : 10)
    .offset(
      (page ? parseInt(page) - 1 : 0) * (pageSize ? parseInt(pageSize) : 10)
    );

  // total is the number of rows that match the search pattern
  const total = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(advocates)
    .where(searchQuery);

  return Response.json({
    data,
    total: total[0].count,
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 10,
  });
}
