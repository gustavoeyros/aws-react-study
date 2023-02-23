import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import _ from "lodash";

//dummy data
let usersData = [
  { id: "1", name: "Name1", age: 18 },
  { id: "2", name: "Name2", age: 19 },
  { id: "3", name: "Name3", age: 20 },
  { id: "4", name: "Name4", age: 21 },
  { id: "5", name: "Name5", age: 22 },
];

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
