import z from "zod";

export const EnvApiSchema = z.object({
	OPENROUTER_API_KEY: z.string().min(1),
	OPENROUTER_DEFAULT_MODEL: z.string().min(1),
});

export type EnvApiType = z.infer<typeof EnvApiSchema>;

export const envApi: EnvApiType = EnvApiSchema.parse(process.env);
