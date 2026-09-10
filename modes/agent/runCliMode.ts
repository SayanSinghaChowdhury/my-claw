import { isCancel, select } from "@clack/prompts";
import chalk from "chalk";

export const runCliMode = async () => {
	while (true) {
		const pickMode = await select({
			message: "pick Your cli Mode Type",
			options: [
				{ value: "agent", label: "Agent-Mode" },
				{
					value: "plan",
					label: "Plan-Mode",
				},

				{
					value: "ask",
					label: "Ask-Mode",
				},

				{
					value: "forward",
					label: "Forward ⏎",
				},
			],
		});

		if (isCancel(pickMode)) {
			console.log(chalk.dim(`successfully exited form mode.`));
			return;
		} else {
			if (pickMode === "forward") {
				console.log(chalk.dim(`successfully forward to back.`));
			}
		}

		if (pickMode === "agent") {
			console.log("agent......");
		}
		if (pickMode === "plan") {
			console.log("plan......");
		}
		if (pickMode === "ask") {
			console.log("ask......");
		}
		if (pickMode === "forward") {
			console.log("Forward......");
		}

		if (
			pickMode !== "agent" &&
			pickMode !== "ask" &&
			pickMode !== "plan" &&
			pickMode !== "forward"
		) {
			console.log(chalk.yellow("That mode is not implemented yet."));
		}
	}
};
