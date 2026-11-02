import { loadEnvFile } from 'node:process';
import { defineConfig, env } from 'prisma/config';

loadEnvFile(new URL('./.env.local', import.meta.url));

export default defineConfig(
{
	datasource:
	{
		url: env('DATABASE_URL')
	}
});
