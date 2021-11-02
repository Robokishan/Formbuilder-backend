process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv/config");
var config = require("./config/config");
var express = require("./config/express");
var colors = require("colors");
var Table = require("cli-table3");

console.log("\nAPI for " + "quadx");
console.log("********************************************");
const listEndpoints = require("express-list-endpoints");

// new methods
import "reflect-metadata";
const { ApolloServer } = require("apollo-server-express");
import { buildSchema } from "type-graphql";
import { createConnection, Connection } from "typeorm";
import "dotenv-safe/config";

import path from "path";
import { FormResolver } from "./controllers/typeGraphqlResolvers/FormResolver";
import { Forms } from "./models/typeormEnt/v1/Forms";
import { formanswers } from "./models/typeormEnt/v1/FormAns";
import { Users } from "./models/typeormEnt/v1/User";
import { UserResolver } from "./controllers/typeGraphqlResolvers/UserResolver";
import { FormAnsResolver } from "./controllers/typeGraphqlResolvers/FormAnsResolver";
import { Context } from "./types/Context";
import cors from "cors";
async function main() {
  // Create server
  var app = express();

  // Construct a schema, using GraphQL schema language

  const connection: Connection = await createConnection({
    type: "mongodb",
    logging: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: process.env.MONGODB_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Forms, formanswers, Users],
  });

  //   await connection.connect();

  const schema = await buildSchema({
    resolvers: [FormResolver, UserResolver, FormAnsResolver], // add this,
  });
  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }) => {
      const ctx: Context = {
        req,
        res,
      };
      return ctx;
    },
  });
  server.applyMiddleware({ app });

  // enable cors
  var corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));

  // Start listening
  app.listen(config.PORT, function () {
    if (process.env.NODE_ENV != "proudction") {
      var table = new Table({ head: ["", "APi", "Method"] });
      var routeList = listEndpoints(app);
      routeList.forEach((link: any, index: any) => {
        let method_message = "";
        for (let i = 0; i < link.methods.length; i++) {
          method_message += link.methods[i];
          if (link.methods.length > 1 && i < link.methods.length - 1) {
            method_message += ", ";
          }
        }
        table.push([index, link.path, colors.red(method_message)]);
      });
      console.log(table.toString());
      console.log("********************************************\n");
    }
    console.log(
      colors.green(
        "🚀  Listening with " +
          process.env.NODE_ENV +
          " config on port " +
          config.PORT
      )
    );
  });
}
main();
