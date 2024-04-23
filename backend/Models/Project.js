import mongoose from "mongoose"
import Todo from "./Todo.js";

// Define the "Project" schema
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    // Embedding the Todo schema in the Project schema
    owner: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
