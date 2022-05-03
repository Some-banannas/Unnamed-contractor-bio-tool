import { Options } from "@mikro-orm/core";
import { User } from "./entities/User";
import path from 'path'

const config: Options = {
    dbName: "DevDB",
    user: "postgres",
    password: "password",
    debug: process.env.NODE_ENV !== 'production',
    type: 'postgresql',
    entities: [User],
    port: 5433,
    allowGlobalContext: true,
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        // pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        // transactional: true, // wrap each migration in a transaction
        // disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        // allOrNothing: true, // wrap all migrations in master transaction
        // dropTables: true, // allow to disable table dropping
        // safe: false, // allow to disable table and column dropping
        // snapshot: true, // save snapshot when creating new migrations
        // emit: 'ts', // migration generation mode
        // generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    }
};

export default config;