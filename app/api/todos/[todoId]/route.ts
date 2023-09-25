import { NextResponse } from "next/server";

// get todo by id
export async function GET(
  _req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    if (!params.todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }
  } catch (error) {
    console.log("[TODO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// update todo by id
export async function PATCH(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    if (!params.todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }
  } catch (error) {
    console.log("[TODO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// delete todo by id
export async function DELETE(
  _req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    if (!params.todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }
  } catch (error) {
    console.log("[TODO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
