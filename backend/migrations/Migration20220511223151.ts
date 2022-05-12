import { Migration } from '@mikro-orm/migrations';

export class Migration20220511223151 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "profile" add column "job_title" varchar(1000) not null default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "profile" drop column "job_title";');
  }

}
