const { writeFile } = require("fs");
const { config } = require("./vault");

const path = require("path");
const metaJson = path.join(process.cwd(), ".", ".env");

const env_var = config().parsed;

let env_str = "";
Object.keys(env_var).forEach((key) => {
  env_str += `${key}=${env_var[key]}\n`;
});

writeFile(metaJson, env_str, "utf8", function (err) {
  if (err) {
    console.error(
      "An error occurred while writing environment variables to .env"
    );
    throw console.error(err);
  } else {
    console.log(`.env file has been created successfully`);
  }
});
