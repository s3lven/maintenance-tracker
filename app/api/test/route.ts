// app/api/reset-data/route.js
// import { resetData } from '@/app/actions/equipment';

// export const dynamic = 'force-dynamic'; // Ensure no caching

// export async function POST() {
//   if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
//     return new Response('Not found', { status: 404 });
//   }
  
//   await resetData();
//   return Response.json({ success: true });
// }