#!/usr/bin/env bun

import { Command } from "commander";

const program = new Command();

program
	.name("My-Claw")
	.description("✋ Hi i am Your helper your Claw yor personal Ai ")
	.version("0.0.1");

program
	.command("run")
	.description(
		"I'm your local AI assistant that lives on your machine & telegram......",
	)
	.action(async () => {
		console.log("(●'◡'●) runing....");
	});

await program.parseAsync(process.argv);
