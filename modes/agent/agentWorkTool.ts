import { tool } from "ai";
import { z } from "zod";
import type { ToolExecutor } from "./tool-exsicute";

const CreateAgentTool = (executor: ToolExecutor) => {
	// toll Exsicute Point all toll inisalize Spell Mistake Not mind
	return {
		read_File: tool({
			description:
				"Read a text file from the workspace. Use a path relative to the project root.",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),
			}),

			execute: async ({ path: p }) => {
				return executor.readFile(p);
			},
		}),

		create_File: tool({
			description:
				"Create a new file from the workspace.(not written until approve).",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),
				content: z.string({ error: "some Thing Wrong " }),
			}),

			execute: async ({ path: p, content: c }) => {
				return executor.createFile(p, c);
			},
		}),

		modifie_file: tool({
			description:
				"Modife a new file from the workspace.(not written until approve).",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),
				content: z.string({ error: "some Thing Wrong " }),
			}),

			execute: async ({ path: p, content: c }) => {
				return executor.modifyFile(p, c);
			},
		}),

		delet_file: tool({
			description: "Stage deletion of a file (pending approval)",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),
			}),

			execute: async ({ path: p }) => {
				return executor.deleteFile(p);
			},
		}),

		create_folder: tool({
			description:
				"Stage creation of a directory tree (pending approval). Uses mkdir -p on apply.",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),
			}),

			execute: async ({ path: p }) => {
				return executor.createFolder(p);
			},
		}),

		list_files: tool({
			description:
				"create_folder a file from the workspace.(not written until approve).",

			inputSchema: z.object({
				path: z
					.string({ error: "someThing happend Wrong " })
					.describe("Relative file path"),

				recursive: z.boolean().optional().default(false),
			}),

			execute: async ({ path: p, recursive }) => {
				return executor.listFiles(p, recursive);
			},
		}),

		search_Files: tool({
			description: "Find files matching a glob pattern (e.g.ts, md)",

			inputSchema: z.object({
				rootRel: z
					.string({ error: "someThing Happend Wrong " })
					.describe("Relative file path"),

				pattern: z
					.string()
					.describe(
						"Glob-like pattern using * and ** (forward slashes)",
					),
				content_contains: z.string().optional(),
			}),

			execute: async ({ rootRel, pattern, content_contains }) => {
				return executor.searchFiles(rootRel, pattern, content_contains);
			},
		}),

		analyze_codebase: tool({
			description:
				"List absolute paths to SKILL.md files under configured skill directories (Cursor / Claude).",
			inputSchema: z.object({
				path: z
					.string({ error: "someThing Happend Wrong " })
					.default("."),
			}),

			execute: async ({ path: p }) => {
				return executor.analyzeCodebase(p);
			},
		}),

		execute_shell: tool({
			inputSchema: z.object({
				Command: z
					.string({ error: "someThing Happend Wrong " })
					.describe("Single command; runs with shell: true"),
			}),

			execute: async ({ Command }) => {
				return executor.queueShell(Command);
			},
		}),
		list_skills: tool({
			inputSchema: z.object({
				Command: z
					.string({ error: "someThing Happend Wrong " })
					.describe(
						"List absolute paths to SKILL.md files under configured skill directories (Cursor / Claude).",
					),
			}),

			execute: async () => {
				return executor.listSkills();
			},
		}),
		read_shell: tool({
			inputSchema: z.object({
				description:
					"Read a SKILL.md file. Path must be absolute and under skill roots, or use a path returned by list_skills.",
				path: z.string(),
			}),

			execute: async ({ path }) => {
				return executor.readSkill(path);
			},
		}),
	};
};

export default CreateAgentTool;
