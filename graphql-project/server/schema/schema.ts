import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import _ from "lodash";
import User from "../model/user";
import Hobby from "../model/hobby";
import Post from "../model/post";
import post from "../model/post";

//dummy data
/* let usersData = [
  { id: "1", name: "Name1", age: 18, profession: "Programmer" },
  { id: "13", name: "Name2", age: 19, profession: "Teacher" },
  { id: "211", name: "Name3", age: 20, profession: "Baker" },
  { id: "19", name: "Name4", age: 21, profession: "Mechanic" },
  { id: "150", name: "Name5", age: 22, profession: "Painter" },
];

let hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place",
    userId: "150",
  },
  {
    id: "2",
    title: "Swimming",
    description: "Get in the water and learn to become the water",
    userId: "211",
  },
  {
    id: "3",
    title: "Fencing",
    description: "A hobby for fency people",
    userId: "13",
  },
  {
    id: "4",
    title: "Hiking",
    description: "Wear hiking boots and explore the world",
    userId: "150",
  },
];

let postsData = [
  { id: "1", comment: "Building a Mind", userId: "1" },
  { id: "2", comment: "GraphQL is Amazing", userId: "1" },
  { id: "3", comment: "How to Change the World", userId: "19" },
  { id: "4", comment: "How to Change the World", userId: "211" },
  { id: "5", comment: "How to Change the World", userId: "1" },
]; */

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({ userId: parent.id });
      },
    },
  }),
});

const HobbyType: any = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const PostType: any = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
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
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Hobby.findById(args.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({ id: args.userId });
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      },
    },
  },
});

//mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },
    createPost: {
      type: PostType,
      args: {
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = new Post({
          comment: args.comment,
          userId: args.userId,
        });
        return post.save();
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let hobby = new Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId,
        });
        return hobby.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
