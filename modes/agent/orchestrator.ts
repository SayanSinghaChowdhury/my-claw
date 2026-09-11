import { isCancel, text } from "@clack/prompts";
import { stepCountIs, ToolLoopAgent } from "ai";
import chalk from "chalk";
import { agentModel } from "../../ai/aiConfig";
import { ActionTrackerMethod } from "./actionTrackerMethod";
import { ToolExecutor } from "./tool-exsicute";
import { DefaultAgentConfig } from "./type";

export const AgentHead = async () => {
	console.log(chalk.bold(" \nAgent Mode 🤖 \n"));

	const firstStep = await text({
		message: "What would you like me to do?",
		placeholder: "e.g. Analyze my project structure/Enter your task...",
	});

	if (isCancel(firstStep)) return;
	// AI CONFIGRATION
	const config = DefaultAgentConfig();
	// AI TRACK TASK DATA
	const actionTracker = new ActionTrackerMethod();

	// const exsicutor = new ToolKitExsicutor(config, actionTracker);

	const executor = new ToolExecutor(actionTracker, config);

	const agent = new ToolLoopAgent({
		model: agentModel(),
		stopWhen: stepCountIs(45),

		instructions: [
			`all mutation are staged until approved`,
			`workspace root:${config.codebasePath}`,
		].join("\n"),
		executor,
	});

	const result = await agent.generate({
		prompt: firstStep.trim(),

		onStepFinish: ({ toolCalls }) => {
			for (const tc of toolCalls) {
				const preview = JSON.stringify(tc.input).slice(0, 160);

				console.log(
					chalk.green("🐸✓"),
					chalk.bold(String(tc.toolName)),
					chalk.dim(preview + (preview.length >= 160 ? "..." : "")),
				);
			}
		},
	});

	if (result.text?.trim()) console.log(result.text);
};
