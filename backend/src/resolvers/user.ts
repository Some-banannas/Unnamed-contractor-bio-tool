// @ts-nocheck
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { comparePasswordSalt, passwordSalt } from "../util/passwordSalt";

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Query(() => User, { nullable: true })
  me(@Ctx() { em, req }: MyContext): Promise<User[]> {
    if (!req.session.userId) {
      return null;
    } else {
      return em.findOne(User, { id: req.session.userId });
    }
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (email.length < 5) {
      return {
        errors: [{ field: "email", message: "email too short" }],
      };
    }
    if (password.length < 8) {
      return {
        errors: [{ field: "password", message: "password too short" }],
      };
    }
    const saltedPassword = await passwordSalt(password);
    const user = em.create(User, { email, password: saltedPassword });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        // Code 23505 = duplicate email
        return {
          errors: [
            {
              field: "email",
              message: "An account with this email alread exists",
            },
          ],
        };
      }
    }
    return {
      user: user,
    };
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Mutation(() => User, { nullable: true })
  async changeUserPassword(
    @Arg("id", () => Int) id: number,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    const saltedPassword = await passwordSalt(password);
    // console.log(user);
    if (typeof saltedPassword != undefined) {
      user.password = saltedPassword;
      await em.persistAndFlush(user);
    }
    return user;
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em, req, res }: MyContext
  ): Promise<UserResponse> {
    let user;
    try {
      user = await em.findOneOrFail(User, { email: email });
    } catch (error) {
      return {
        errors: [{ field: "user", message: "User not found" }],
      };
    }
    if (!user) {
      return {
        errors: [{ field: "email", message: "Could not find an email" }],
      };
    }

    const validPwd = await comparePasswordSalt(user, password);

    if (!validPwd) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }

    req.session.userId = user.id;
    return {
      user: user,
    };
  }
}
