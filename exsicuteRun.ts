import chalk from "chalk";
import figlet from "figlet";

const font = "ANSI Shadow";

const color = chalk.hex(`#A9FC29`);

const face = chalk.hex(`#A9DC29`);

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

	try {
		text_banner = figlet.textSync("MY CLAW  (●'◡'●)", { font: font });
	} catch (error) {
		text_banner = figlet.textSync("MY CLAW (●'◡'●)", { font: "Standard" });
	}

	printBannerWithShadow(text_banner);
}
