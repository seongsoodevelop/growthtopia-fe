const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "#": path.resolve(__dirname, "src/"),
      "#components": path.resolve(__dirname, "src/components/"),
      "#containers": path.resolve(__dirname, "src/containers/"),
      "#lib": path.resolve(__dirname, "src/lib/"),
      "#locales": path.resolve(__dirname, "src/locales/"),
      "#pages": path.resolve(__dirname, "src/pages/"),
      "#redux": path.resolve(__dirname, "src/redux/"),
    },
  },
};
