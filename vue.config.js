  // const path = require("path"); //引入path模块
//
// module.exports = {
//   configureWebpack: {
//       resolve: {
//         alias: {
//           "assets": path.resolve(__dirname, "./src/assets"),
//           "components": path.resolve(__dirname, "./src/components"),
//           "views": path.resolve(__dirname, "./src/views")
//         }
//     }
//   }
// };


const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
    .set("assets", resolve("src/assets"))
    .set("components", resolve("src/components"))
    .set("views", resolve("src/views"))
    .set("tabbar", resolve("src/assets/img/tabbar"))
    .set("common", resolve("src/assets/img/common"))
    .set("profile", resolve("src/assets/img/profile"))
    .set("network", resolve("src/network"))
      .set("detail", resolve("src/assets/img/detail"))
  }
};