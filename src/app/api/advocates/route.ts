import db from '@/db';
import { advocates } from '@/db/schema';

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  console.log(data.length);
  return Response.json({ data });
}
