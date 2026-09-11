import { tool } from "ai";
import {} from "module";
import z from "zod";
import type { ToolExecutor } from "./tool-exsicute";

const CreateAgentToll = (exsicutor: ToolExecutor) => {
	return {
		read_File: tool({
			description:
				"Read a text file from the workspace. Use a path relative to the project root.",

			inputSchema: z.object({
				path: z.string().describe("Relative File path"),
			}),
		}),
		exsicutor: async ({ path: p }) => exsicutor.readFile(p),
	};
};
