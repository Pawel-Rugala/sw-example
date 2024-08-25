// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const config = {
    require: ["tsx"],
    file: path.join(__dirname, "integration/setup.ts"),
    spec: "**/*.i-spec.ts",
    exit: true,
    timeout: 5000,
};

module.exports = config;
