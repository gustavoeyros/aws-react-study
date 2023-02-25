import mongoose from "mongoose";

const MSChema = mongoose.Schema;

const hobbySchema = new MSChema({
  title: String,
  description: String,
  userId: String,
});

export default mongoose.model("Hobby", hobbySchema);
