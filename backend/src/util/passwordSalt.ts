//@ts-nocheck
import bcrypt from "bcrypt";
import { User } from "src/entities/User";

export async function passwordSalt(password: string) {
  const saltRounds = 13;
  console.log("here");
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
  return hash;
}

export async function comparePasswordSalt(user: User, password: string) {
  return await bcrypt.compare(password, user.password);
}
