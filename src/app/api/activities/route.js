import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Activity from "../../../../models/activity";

// Creating a new activity
export async function POST(request) {
  await connectMongoDB();
  const activity = await request.json();

  const response = await Activity.create(activity);
  return NextResponse.json({ response }, { status: 201 });
}

// Geting the list of all Activities
export async function GET(request) {
  await connectMongoDB();

  const activities = await Activity.find();
  return NextResponse.json({ activities }, { status: 200 });
}

// Delete all activities
export async function DELETE() {
  await connectMongoDB();
  const response = await Activity.deleteMany();
  return NextResponse.json({ response }, { status: 201 });
}
