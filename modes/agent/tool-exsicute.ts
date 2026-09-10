import path from "node:path";
import type { ActionTrackerMethod } from "./actionTrackerMethod";
import type { AgentConfig } from "./type";

// File EXTENSION IN KOWER CASE
const TEXT_EXT = new Set([
	".js",
	".jsx",
	".ts",
	".tsx",
	".mjs",
	".cjs",

	".html",
	".htm",
	".css",
	".scss",
	".sass",
	".less",

	".json",
	".jsonc",
	".xml",
	".yaml",
	".yml",
	".toml",

	".c",
	".h",
	".cpp",
	".cc",
	".cxx",
	".hpp",

	".java",
	".kt",
	".kts",
	".scala",

	".py",
	".pyw",
	".rb",
	".php",
	".swift",
	".go",
	".rs",
	".dart",

	".sh",
	".bash",
	".zsh",
	".fish",
	".ps1",
	".bat",
	".cmd",

	".sql",
	".graphql",
	".gql",

	".vue",
	".svelte",
	".astro",

	".lua",
	".r",
	".pl",
	".pm",

	".ex",
	".exs",
	".erl",
	".hrl",

	".fs",
	".fsx",
	".fsproj",
	".vb",
	".cs",
	".csx",

	".sol",
	".move",

	".asm",
	".s",

	".md",
	".mdx",
	".txt",
]);

const isTextFileMaybe = (filepath: string): boolean => {
	const ext = path.extname(filepath).toLowerCase();

	return TEXT_EXT.has(ext) || ext === ``;
};

export class ToolKitExsicutor {
	constructor(
		private readonly tracker: ActionTrackerMethod,
		private readonly config: AgentConfig,
	) {}
}
