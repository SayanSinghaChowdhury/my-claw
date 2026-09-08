import { isCancel, select } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const font = "ANSI Shadow";

const color = chalk.hex(`#A9FC29`);

const face = chalk.hex(`#A9DC29`);

const vface = chalk.hex(`#FFFFF8`);

function printBannerWithShadow(text_banner: string) {
	const bannerLines = text_banner.replace(/\s+$/, "").split("\n");
	const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
	const rowWidth = maxLen + 4;

	for (const line of bannerLines) {
		console.log(color((" " + line).padEnd(rowWidth)));
	}
	process.stdout.write(`\x1b[${bannerLines.length}A`);
	for (const line of bannerLines) {
		console.log(face(line.padEnd(rowWidth)));
	}
}

export async function exsicuteRun() {
	let text_banner: string;

	let version = "0.0.1";

	try {
		text_banner = figlet.textSync("MY CLAW  ", {
			font: font,
		});
	} catch (error) {
		text_banner = figlet.textSync("MY CLAW ", { font: "Standard" });
	}

	printBannerWithShadow(text_banner);

	console.log(vface(`version: ${version}`));

	const mode = await select({
		message: "Pick your mode — how do you want to run my-claw?",

		options: [
			{ value: "cli", label: "CLI 🐸" },
			{ value: "telegram", label: "TELEGRAM 🫧" },
		],
	});

	if (isCancel(mode)) {
		process.exit(0);
	} else {
		if (mode === "cli") {
			console.log(chalk.dim(`starting CLI mode.......`));
		} else {
			console.log(chalk.dim(`starting Teligram mode.......`));
		}
	}
}
