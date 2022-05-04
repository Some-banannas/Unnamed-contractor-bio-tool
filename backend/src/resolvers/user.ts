// @ts-nocheck
import { User } from "../entities/User";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { passwordSalt } from "../util/passwordSalt";
import { type } from "os";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }
  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const saltedPassword = await passwordSalt(password);
    const user = em.create(User, { email, password: saltedPassword });
    await em.persistAndFlush(user);
    return user;
  }

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
    console.log(user);
    if (typeof saltedPassword != undefined) {
      user.password = saltedPassword;
      await em.persistAndFlush(user);
    }
    return user;
  }
}
