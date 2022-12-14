import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    startDay: {
      type: Date,
      required: true,
    },
    endDay: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = model("Project", projectSchema);

export { projectModel };
