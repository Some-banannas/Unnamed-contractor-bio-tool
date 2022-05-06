import { Migration } from '@mikro-orm/migrations';

export class Migration20220506021853 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "first_name" varchar(255) not null default \'\', add column "last_name" varchar(255) not null default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "first_name";');
    this.addSql('alter table "user" drop column "last_name";');
  }

}
