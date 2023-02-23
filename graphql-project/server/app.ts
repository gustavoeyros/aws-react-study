import express from "express";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("running in 4000");
});
