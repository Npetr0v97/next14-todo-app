import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    location: { type: String, required: true },
    distance: {type: Number, required: true},
    date: {type: Date, required: false},
    activityType: {type: String, required: false}
  },
  { timestamps: true }
);

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
