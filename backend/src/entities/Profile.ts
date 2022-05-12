import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Profile {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ default: "", length: 1000 })
  aboutMe!: string;

  @Field()
  @Property({ default: "", length: 1000 })
  jobTitle!: string;

  @ManyToOne()
  owningUser!: User;
}
