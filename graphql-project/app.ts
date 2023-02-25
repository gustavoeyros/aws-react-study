import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./server/schema/schema";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);
mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://awssyncamplify:${process.env.ATLAS_PASS}@cluster0.mfjuuri.mongodb.net/?retryWrites=true&w=majority
`
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("running in 4000");
    });
  })
  .catch((e) => console.log(e));
