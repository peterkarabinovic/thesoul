import * as z from 'zod';

const Config = z.object({
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.string().transform(Number),
  DB_DATABASE: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  PORT: z.string().transform(Number),
});

const res = Config.safeParse(process.env);

if (!res.success) {
  console.error('TheStoreBack Invalid Config: ', res.error.format());
  process.exit(1);
}
export type Config = z.infer<typeof Config>;
export const config = res.data;
