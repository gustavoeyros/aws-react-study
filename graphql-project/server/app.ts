import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(4000, () => {
  console.log("running in 4000");
});
