import { Migration } from '@mikro-orm/migrations';

export class Migration20220510230720 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_profile_id_foreign";');

    this.addSql('drop table if exists "profile" cascade;');

    this.addSql('alter table "user" drop constraint "user_profile_id_unique";');
    this.addSql('alter table "user" drop column "profile_id";');
  }

  async down(): Promise<void> {
    this.addSql('create table "profile" ("id" serial primary key, "profile_owner_id" int4 not null default null);');

    this.addSql('alter table "user" add column "profile_id" int4 null default null;');
    this.addSql('alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "profile" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_profile_id_unique" unique ("profile_id");');
  }

}
