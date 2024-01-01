import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Todo from "../../../../models/todo";

// Creating a new Todo
export async function POST(request) {
  const { content } = await request.json();
  await connectMongoDB();

  // Defining the Todo. Content is coming from the user input. Completed and Resolved by default are false/empty
  const todo = {
    content,
    completed: false,
    resolved: null,
  };

  const response = await Todo.create(todo);
  return NextResponse.json({ response }, { status: 201 });
}

// Geting the list of all Todos
export async function GET(request) {
  await connectMongoDB();

  const todos = await Todo.find();
  return NextResponse.json({ todos }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Todo.findByIdAndDelete(id);

  return NextResponse.json({ message: "Todo Deleted" }, { status: 200 });
}
