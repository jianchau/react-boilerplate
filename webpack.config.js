const commonConfig = require("./configuration/webpack.common.config");

const productionConfig = require("./configuration/webpack.prod.config");

const developmentConfig = require("./configuration/webpack.dev.config");
const { merge } = require("webpack-merge");
module.exports = (env, args) => {
	switch (args.mode) {
		case "development":
			return merge(commonConfig, developmentConfig);
		case "production":
			return merge(commonConfig, productionConfig);
		default:
			throw new Error("No matching configuration was found!");
	}
};
