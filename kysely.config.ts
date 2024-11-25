import { defineConfig } from "kysely-ctl";

import { db } from "./database/kysely";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: 'database/migrations',
  },
  seeds: {
    seedFolder: 'database/seeds',
    getSeedPrefix: () => '',
  }
});