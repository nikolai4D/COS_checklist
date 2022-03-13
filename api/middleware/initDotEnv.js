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
    const API_BASE_URL = "http://localhost:3002/api";
    const PORT = 3000;
    const envFileContent = `PORT=${PORT}
API_BASE_URL=${API_BASE_URL}`;

    try {
      await fs.writeFileSync(dirEnvFile, envFileContent);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = initDotEnv;
