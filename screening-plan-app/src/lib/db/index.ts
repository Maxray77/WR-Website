import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  __screeningSql?: ReturnType<typeof postgres>;
  __screeningDb?: Database;
};

function connect(): Database {
  if (globalForDb.__screeningDb) return globalForDb.__screeningDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add your Postgres connection string.",
    );
  }

  /**
   * `prepare: false` is required behind a transaction pooler (Neon's `-pooler`
   * host, Supabase's pgbouncer on :6543). The client is cached on globalThis so
   * dev hot-reloads don't exhaust the connection pool.
   */
  const client =
    globalForDb.__screeningSql ??
    postgres(connectionString, { max: 10, idle_timeout: 20, prepare: false });

  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__screeningSql = client;
    globalForDb.__screeningDb = instance;
  }
  return instance;
}

/**
 * Lazy database handle.
 *
 * Connecting on first use rather than on import means a missing DATABASE_URL
 * surfaces as a clear runtime error on the page that needs it, instead of
 * breaking `next build` while it collects page metadata.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const instance = connect();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export { schema };
