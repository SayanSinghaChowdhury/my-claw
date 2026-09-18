import z from "zod";

export const EnvApiSchema = z.object({
	OPENROUTER_API_KEY: z.string().min(1),
	OPENROUTER_DEFAULT_MODEL: z.string().min(1),
});

export type EnvApiType = z.infer<typeof EnvApiSchema>;

export const envApi: EnvApiType = EnvApiSchema.parse({
	OPENROUTER_API_KEY: Bun.env.OPENROUTER_API_KEY,
	OPENROUTER_DEFAULT_MODEL: Bun.env.OPENROUTER_DEFAULT_MODEL,
});
