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
	private overlay = new Map<string, string>();
	private deleted = new Set<string>();
	private readonly norm = (rel: string) =>
		path.posix.normalize(
			rel.split(path.sep).join("/").replace(/^\.\//, ""),
		);

	constructor(
		private readonly tracker: ActionTrackerMethod,
		private readonly config: AgentConfig,
	) {}

	// path Sequrity

	private resolveSafe(rel: string): string {
		const abs = path.resolve(this.config.codebasePath, rel);
		const root = path.resolve(this.config.codebasePath);
		const relCheck = path.relative(root, abs);
		if (relCheck.startsWith("..") || path.isAbsolute(relCheck)) {
			throw new Error(`Path escapes workspace: ${rel}`);
		}
		return abs;
	}
	// excluded
	private excluded(relPath: string): boolean {
		const norm = this.norm(relPath);
		const segments = norm.split("/");
		const base = segments[segments.length - 1] ?? "";

		for (const pat of this.config.excludePatterns) {
			if (pat === "*.log" && base.endsWith(".log")) return true;
			if (pat === ".env*" && base.startsWith(".env")) return true;
			if (pat.includes("*")) continue;
			if (
				segments.includes(pat) ||
				norm === pat ||
				norm.startsWith(`${pat}/`)
			)
				return true;
		}
		return false;
	}
}
