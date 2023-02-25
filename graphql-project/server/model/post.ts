import mongoose, { mongo } from "mongoose";

const MSChema = mongoose.Schema;

const postSchema = new MSChema({
  comment: String,
  userId: String,
});

export default mongoose.model("Post", postSchema);
