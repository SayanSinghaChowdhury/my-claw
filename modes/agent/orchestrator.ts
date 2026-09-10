import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { ActionTrackerMethod } from "./actionTrackerMethod";
import { ToolKitExsicutor } from "./tool-exsicute";
import { DefaultAgentConfig } from "./type";

const {} = async () => {
	console.log(chalk.bold(" \nAgent Mode 🤖 \n"));

	const firstStep = await text({
		message: "What would you like me to do?",
		placeholder: "e.g. Analyze my project structure/Enter your task...",
	});

	if (isCancel(firstStep || firstStep.trim)) return;
	// AI CONFIGRATION
	const config = DefaultAgentConfig();
	// AI TRACK TASK DATA
	const actionTracker = new ActionTrackerMethod();

	// const exsicutor = new ToolKitExsicutor(config, actionTracker);

	const executor = new ToolKitExsicutor(actionTracker, config);
};
