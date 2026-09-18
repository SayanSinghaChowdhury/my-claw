#!/usr/bin/env bun

import { Command } from "commander";
import { exsicuteRun } from "./exsicuteRun";

const program = new Command();

program
	.name("my-claw")
	.description("✋ Hi I am your helper, your Claw, your personal AI")
	.version("0.0.1");

program
	.command("run")
	.description(
		"I'm your local AI assistant that lives on your machine & Telegram......",
	)
	.action(async () => {
		await exsicuteRun();
	});

await program.parseAsync(process.argv);
