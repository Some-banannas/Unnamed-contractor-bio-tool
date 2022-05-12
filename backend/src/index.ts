//@ts-nocheck
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
// import sessions from "client-sessions";
import session from "express-session";
import { ProfileResolver } from "./resolvers/profile";
const main = async () => {
  // console.log(microConfig)
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();
  const cors = {
    credentials: true,
    origin: function (origin, callback) {
      callback(null, true);
    },
  };
  app.set("trust proxy", 1);
  app.use(
    session({
      name: "session",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        // secure: true,
      },
      saveUninitialized: false,
      secret: "dfhfdjkgfkbjktzkzf",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ProfileResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors });

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
};

main().catch((err) => {
  console.error(err);
});
