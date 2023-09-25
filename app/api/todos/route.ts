import { NextResponse } from "next/server";

// create todo
export async function POST(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("[TODO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// get todos
export async function GET(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("[TODO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
