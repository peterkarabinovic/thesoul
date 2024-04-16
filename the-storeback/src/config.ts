import * as z from 'zod';

// The config which is used by app
const Config = z.object({
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.string().transform(Number),
  DB_DATABASE: z.string(),
  APPLICATION_DB_USER: z.string(),
  APPLICATION_DB_PASSWORD: z.string(),
  MIGRATION_DB_USER: z.string().optional(),
  MIGRATION_DB_PASSWORD: z.string().optional(),
PORT: z.string().transform(Number),
});

export type Config = z.infer<typeof Config>;

const res = Config.safeParse(process.env);
if (!res.success) {
    console.error('TheStoreBack Invalid App Config: ', res.error.format());
    process.exit(1);
}

export const config: Config = res.data;