import path from "path"

// ! client side loader only \\
export default ({ config }) => {
  const { webpackConfig } = config
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      loaders: [
        ...webpackConfig.module.loaders,
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev ? "?presets[]=babel-preset-react-hmre" : ""
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(config.cwd, "scripts"),
            path.resolve(config.cwd, "web_modules"),
            // because docs use non transpiled code
            path.resolve(config.cwd, "..", "src"),
          ],
        },
      ],
    },

    entry: {
      "statinamic-client": path.join(__dirname, "index-client"),
    },
  }
}
