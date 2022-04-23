import { PrismaClient, User } from "@prisma/client";
import { GraphQLScalarType } from "graphql";

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver,
  };
}

export type Scalars = {
  Upload: GraphQLScalarType
}