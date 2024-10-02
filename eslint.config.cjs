const eslint = require("@eslint/js");
const globals = require("globals");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
module.exports = [
	eslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		ignores: ["**/*.config.cjs", "**/*.config.js", "examples/**"]
	},
	{
		files: ["**/*.js"],
		rules: {
			"prettier/prettier": "off",
            "no-unused-vars":"off"
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				console: "readonly",
				process: "readonly",
                Buffer: "readonly"
			}
		}
	}
	
];