// const path = require("path");
// const { paths } = require("@craco/craco");

module.exports = {
  babel: {
    presets: ["@babel/preset-react", "@babel/preset-typescript"],
    plugins: [
      ["@babel/plugin-proposal-object-rest-spread"],
      ["@babel/plugin-transform-spread"],
      ["@babel/plugin-proposal-export-default-from"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        "module-resolver",
        {
          alias: {
            "~": "./src",
            "^@components/(.*)": "./src/Components/\\1",
            "@components": ["./src/Components/index.ts"],
            "@enums": "./src/Enums/index.ts",
            "@interfaces": "./src/Interfaces/index.ts",
            "^@images/(.*)": "./src/Assets/Images/\\1",
            "@models": "./src/Models/index.ts",
            "@pages": "./src/Pages/index.ts",
            "@services": "./src/Services/index.ts",
            "@shared": "./src/Components/Shared/index.ts",
            "@themes": "./src/Themes/index.ts",
          },
        },
      ],
    ],
    loaderOptions: {
      /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
    },
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    },
  },
};
