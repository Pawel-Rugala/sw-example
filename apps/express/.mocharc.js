const config = {
    require: ["tsx"],
    extension: ["ts"], // Ensures that Mocha recognizes `.ts` files
    spec: "test/**/*.i-spec.ts",
    exit: true,
    timeout: 5000, // Alternatively, use the string "5s"
};

module.exports = config;
