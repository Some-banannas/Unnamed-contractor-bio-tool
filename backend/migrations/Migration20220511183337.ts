import { Migration } from '@mikro-orm/migrations';

export class Migration20220511183337 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "profile" add column "about_me" varchar(1000) not null default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "profile" drop column "about_me";');
  }

}
