const response = await fetch("https://openrouter.ai/api/v1/models", {
	headers: {
		Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
	},
});

console.log("Status:", response.status);
console.log(await response.text());
