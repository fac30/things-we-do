export async function GET() {
  console.log("I am being logged in toolkit/route.ts");
  return new Response("Success", { status: 200 });
}
