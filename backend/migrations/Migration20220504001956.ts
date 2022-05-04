import { Migration } from '@mikro-orm/migrations';

export class Migration20220504001956 extends Migration {

  async up(): Promise<void> {
    // console.log("HEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEH")
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null);');
  }

}
