import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import testSchema from "./schema/types_schema";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: testSchema,
  })
);

app.listen(4000, () => {
  console.log("running in 4000");
});
