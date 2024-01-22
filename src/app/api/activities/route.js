import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Activity from "../../../../models/activity";

export async function POST() {
    // const { content } = await request.json();
    await connectMongoDB();
  
    // Defining the Todo. Content is coming from the user input. Completed and Resolved by default are false/empty
    const todo = {
      location: "Ruse",
      distance: 20,
      date: new Date(),
      activityType: "Run"
    };
  
    const response = await Activity.create(todo);
    return NextResponse.json({ response }, { status: 201 });
  }
  
  // Geting the list of all Todos
  export async function GET(request) {
    await connectMongoDB();
  
    const activities = await Activity.find();
    return NextResponse.json({ activities }, { status: 200 });
  }
  
 