const path = require("node:path")

module.exports = {
  map: {
    inline: false
  },
  plugins: [
    require("postcss-import"),
    require("postcss-url")({
      url: "copy",
      basePath: path.resolve("node_modules/@claviska/jquery-minicolors"),
      assetsPath: ".",
      useHash: true,
      hashOptions: {
        append: true
      }
    }),
    require("autoprefixer")
  ]
}
