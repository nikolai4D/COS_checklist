async function initDotEnv() {
  const fs = require("fs");
  const { v4: uuidv4 } = require("uuid");
  const dir = "./";
  const envFile = ".env";
  const files = fs.readdirSync(dir);
  let filesArray = [];

  files.forEach(function (file) {
    filesArray.push(file);
  });

  if (!filesArray.includes(envFile)) {
    const dirEnvFile = dir + envFile;
    const API_KEY = uuidv4();
    const PORT = 3000;
    const ACCESS_TOKEN_SECRET = uuidv4();
    const REFRESH_TOKEN_SECRET = uuidv4();
    const envFileContent = `API_KEY=${API_KEY}
  PORT=${PORT}
  ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
  REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}`;

    try {
      await fs.writeFileSync(dirEnvFile, envFileContent);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = initDotEnv;
