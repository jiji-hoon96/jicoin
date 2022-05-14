import bcrypt from "bcrypt";

import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { nickname, username, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            nickname,
            password: passwordHash,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolvers;
