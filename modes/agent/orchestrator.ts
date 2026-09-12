import { isCancel, spinner, text } from "@clack/prompts";
import { stepCountIs, ToolLoopAgent } from "ai";
import chalk from "chalk";
import { agentModel } from "../../ai/aiConfig";
import { DefaultAgentConfig } from "../../lib/type";
import { ActionTrackerMethod } from "./actionTrackerMethod";
import CreateAgentTool from "./agentWorkTool";
import { ToolExecutor } from "./tool-exsicute";

export const AgentHead = async () => {
	const s = spinner();
	// console.log(chalk.bold(" \nAgent Mode 🤖 \n"));

	s.start("🤖 Agent is working...");

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

	const tools = CreateAgentTool(executor);

	const agent = new ToolLoopAgent({
		model: agentModel(),
		stopWhen: stepCountIs(40),

		instructions: [
			`all mutation are staged until approved`,
			`workspace root:${config.codebasePath}`,
		].join("\n"),
	});
	tools;

	const result = await agent.generate({
		prompt: firstStep.trim(),

		onStepFinish: ({ toolCalls }) => {
			for (const tc of toolCalls) {
				const preview = JSON.stringify(tc.input).slice(0, 160);

				s.message(
					`${chalk.magenta("⚙")} ${chalk.bold(String(tc.toolName))} ${chalk.dim(
						preview + (preview.length >= 160 ? "..." : ""),
					)}`,
				);
			}
		},
	});

	if (result.text?.trim()) {
		console.log(
			chalk.cyan.bold(
				"\n┌─ 🤖 Agent Result ───────────────────────────┐",
			),
		);

		console.log(chalk.white(`│ ${result.text}`));

		console.log(
			chalk.cyan.bold(
				"└──────────────────────────────────────────────┘\n",
			),
		);
	}
};
