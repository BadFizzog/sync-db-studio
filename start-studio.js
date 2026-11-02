import { spawnSync } from 'node:child_process';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';
import { printBrandBanner } from './banner.js';

loadEnvFile(new URL('./.env.local', import.meta.url));

const port = (process.env.PORT ?? '5555').trim();

if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)
{
	console.error('PORT must be an integer between 1 and 65535. Check .env.local and any exported PORT variable.');
	process.exit(1);
}

const prisma_path = fileURLToPath(import.meta.resolve('prisma/build/index.js'));
printBrandBanner();

const result = spawnSync(process.execPath,
[
	prisma_path,
	'studio',
	'--port',
	port,
	'--browser',
	'none'
],
{
	cwd: fileURLToPath(new URL('.', import.meta.url)),
	stdio: 'inherit',
	env: process.env
});

if (result.error)
{
	console.error(result.error.message);
}

process.exitCode = result.status ?? (result.signal === 'SIGINT' ? 130 : 1);
