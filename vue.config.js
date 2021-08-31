const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  publicPath: process.env.NODE_ENV === "production" ? "/pomodoro/" : "/",
};

// 讓所有檔案能使用同一個 scss 分支檔 
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/style/mixin.scss")],
    });
}
