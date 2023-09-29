import prismadb from "@/lib/prismadb";
import { ErrorResponse, SuccessResponse } from "@/utils/response";
import { NextResponse } from "next/server";

// get todo by id
export async function GET(
  _req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    if (!taskId) {
      return NextResponse.json(ErrorResponse("Todo id is required."), { status: 400 });
    }

    const task = await prismadb.todo.findUnique({
      where: {
        id: taskId,
      },
    });

    if(!task){
      return NextResponse.json(ErrorResponse(`Task id ${taskId} not found.`), { status: 404 });
    }

    return NextResponse.json(SuccessResponse(task),{status: 200});
  } catch (error) {
    console.log("[TODO_GET]", error);
    return NextResponse.json(ErrorResponse("Internal error."), { status: 500 });
  }
}

// update todo by id
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const { title, done } = await req.json();
    if (!taskId) {
      return NextResponse.json(ErrorResponse("Todo id is required."), { status: 400 });
    }

    if (!title) {
      return NextResponse.json(ErrorResponse("Title is required."), { status: 400 });
    }

    const task = await prismadb.todo.findUnique({
      where: {
        id: taskId,
      },
    })

    if(!task){
      return NextResponse.json(ErrorResponse(`Task id ${taskId} not found.`), { status: 404 });
    }

    const updateTask = await prismadb.todo.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        done: done !== undefined ? done : task.done,
      },
    });

    return NextResponse.json(SuccessResponse(updateTask, "Update task success."),{ status: 200 });
  } catch (error) {
    console.log("[TODO_PATCH]", error);
    return NextResponse.json(ErrorResponse("Internal error."), { status: 500 });
  }
}

// delete todo by id
export async function DELETE(
  _req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    if (!taskId) {
      return NextResponse.json(ErrorResponse("Todo id is required"), { status: 400 });
    }

    const task = await prismadb.todo.findUnique({
      where: {
        id: taskId,
      },
    })

    if(!task){
      return NextResponse.json(ErrorResponse(`Task id ${taskId} not found.`), { status: 404 });
    }

    const deleteTask = await prismadb.todo.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(SuccessResponse(deleteTask, "Delete task success."), { status: 202 });
  } catch (error) {
    console.log("[TODO_DELETE]", error);
    return NextResponse.json(ErrorResponse("Internal error."), { status: 500 });
  }
}
