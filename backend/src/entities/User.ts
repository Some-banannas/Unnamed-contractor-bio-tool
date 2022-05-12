import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  UuidType,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  // // @Field()
  // @Property({ type: "varchar(255)" })
  // uuid = new UuidType();

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Field()
  @Property({ default: "" })
  firstName!: string;

  @Field()
  @Property({ default: "" })
  lastName!: string;

  @OneToMany(() => Profile, (profile) => profile.owningUser)
  profiles = new Collection<Profile>(this);
}
