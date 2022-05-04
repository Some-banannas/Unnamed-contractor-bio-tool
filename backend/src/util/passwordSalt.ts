//@ts-nocheck
import bcrypt from "bcrypt";

export async function passwordSalt(password: string) {
  const saltRounds = 13;
  console.log("here");
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
  return hash;
}
