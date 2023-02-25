import mongoose from "mongoose";

const MSChema = mongoose.Schema;

const userSchema = new MSChema({
  name: String,
  age: Number,
  profession: String,
});

export default mongoose.model("User", userSchema);
