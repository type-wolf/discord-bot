module.exports = {
	transform: {
		globals: ["ts-jest"],
		".ts": "ts-jest",
	},
	testMatch: ["**/__tests__/**/*.test.ts"],
	// globalSetup: "./__tests__/setup.ts",
	// globalTeardown: "./__tests__/teardown.ts",
};
