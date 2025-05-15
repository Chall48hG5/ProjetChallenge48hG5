import sql from '@/plugins/db';

export async function GET() {
  const rows = await sql`SELECT * FROM chats LIMIT 10`;
  return Response.json(rows);
}