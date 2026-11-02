import { readFileSync } from 'node:fs';

const PRODUCT_VERSION = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version;
const USE_COLOR = process.stdout.isTTY && process.env.NO_COLOR === undefined;

const RED = USE_COLOR ? '\x1b[91m' : '';
const GREEN = USE_COLOR ? '\x1b[92m' : '';
const DIM = USE_COLOR ? '\x1b[2m' : '';
const BOLD = USE_COLOR ? '\x1b[1m' : '';
const RESET = USE_COLOR ? '\x1b[0m' : '';

const BADVR_ART = `
██████╗  █████╗ ██████╗ ██╗   ██╗██████╗
██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗
██████╔╝███████║██║  ██║██║   ██║██████╔╝
██╔══██╗██╔══██║██║  ██║╚██╗ ██╔╝██╔══██╗
██████╔╝██║  ██║██████╔╝ ╚████╔╝ ██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═════╝   ╚═══╝  ╚═╝  ╚═╝
`.trimEnd();

/**
 * widen ascii letters to fullwidth (~2x) for a modest size bump
 * @param {string} text - ascii text
 * @returns {string} fullwidth text
 */
function widen(text)
{
	let out = '';
	for (const ch of text)
	{
		const code = ch.charCodeAt(0);
		if (ch === ' ')
			out += '　';
		else if (code >= 0x21 && code <= 0x7e)
			out += String.fromCharCode(0xff00 + code - 0x20);
		else
			out += ch;
	}

	return out;
}

/**
 * print company / product banner to the terminal
 */
export function printBrandBanner()
{
	console.log();
	console.log(`${RED}${BADVR_ART}${RESET}`);
	console.log();
	console.log(`${GREEN}${BOLD}  ${widen('Sync DB Studio')}${RESET}  ${DIM}v${PRODUCT_VERSION}${RESET}`);
	console.log();
	console.log('  Browse and edit your Sync SQLite database.');
	console.log('  Powered by Prisma Studio.');
	console.log();
	console.log(`${DIM}  BadVR, Inc. © 2026, All Rights Reserved.${RESET}`);
	console.log();
	console.log(`${DIM}  For internal use by BadVR employees. Press Ctrl+C to stop.${RESET}`);
	console.log();
}
