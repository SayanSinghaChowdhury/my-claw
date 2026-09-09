import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { actionTrackerMethod } from "./actionTrackerMethod";
import { defaultAgentConfig } from "./type";

const runAgentMode = async () => {
	console.log(chalk.bold(" \nAgent Mode 🤖 \n"));

	const firstStep = await text({
		message: "What would you like me to do?",
		placeholder: "e.g. Analyze my project structure/Enter your task...",
	});

	if (isCancel(firstStep || firstStep.trim)) return;

	const config = defaultAgentConfig();

	const actionTracker = actionTrackerMethod();
};
