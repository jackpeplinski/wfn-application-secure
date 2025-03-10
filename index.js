const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const cors = require("cors")
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const { MONGODB } = require("./config.js");

const corsOptions = {
  origin: "*",
  credentials: true
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: corsOptions
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server at ${res.url}`);
  });
