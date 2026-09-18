import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { envApi } from "../lib/env";

export const agentModel = () => {
	const provider = createOpenRouter({
		apiKey: envApi.OPENROUTER_API_KEY,
	});

	const modelId = envApi.OPENROUTER_DEFAULT_MODEL;
	return provider(modelId);
};
