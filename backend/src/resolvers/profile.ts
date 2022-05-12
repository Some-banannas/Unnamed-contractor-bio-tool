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
import { Profile } from "../entities/Profile";
import { GeoReplyWith } from "redis";

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@ObjectType()
class ProfileError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class ProfileResponse {
  @Field(() => [ProfileError], { nullable: true })
  errors?: ProfileError[];

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  profiles(@Ctx() { em, req }: MyContext): Promise<Profile[]> {
    return em.find(Profile, {});
  }
  @Query(() => [Profile])
  profile(@Ctx() { em, req }: MyContext): Promise<Profile[]> {
    return em.find(Profile, { owningUser: req.session.userId });
  }
  @Query(() => [Profile])
  profileByUserId(
    @Arg("userId", () => Number) userId: number,

    @Ctx() { em, req }: MyContext
  ): Promise<Profile[]> {
    return em.findOne(Profile, { owningUser: userId });
  }

  @Mutation(() => ProfileResponse, { nullable: true })
  async changeProfile(
    @Arg("aboutMe", () => String) aboutMe: string,
    @Arg("jobTitle", () => String) jobTitle: string,
    @Ctx() { em, req }: MyContext
  ): Promise<ProfileResponse | null> {
    const profile = await em.findOne(Profile, {
      owningUser: req.session.userId,
    });
    if (!profile) {
      return {
        errors: [
          {
            field: "owningUser",
            message: "Could not find a profile for the user",
          },
        ],
      };
    }

    if (aboutMe.length <= 1000) {
      profile.aboutMe = aboutMe;
      profile.jobTitle = jobTitle;
      await em.persistAndFlush(profile);
    }
    return {
      profile: profile,
    };
  }
}
