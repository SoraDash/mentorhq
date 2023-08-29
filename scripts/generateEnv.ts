import * as fs from "fs";

type EnvironmentVariable = {
  name: string,
  type: "string",
};

const getFileContents = (filename: string): string[] => {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, { encoding: "utf-8" }).split("\n");
  }
  return [];
};

const filterEnv = (lines: string[]): EnvironmentVariable[] => {
  return lines
    .filter((line) => line.includes("="))
    .map((line) => {
      const [name] = line.split("=");
      return { name, type: "string" };
    });
};

const contents = (): EnvironmentVariable[] => {
  const env = getFileContents(".env");
  const envStaging = getFileContents(".env.staging");
  const envProd = getFileContents(".env.prod");

  return [...filterEnv(env), ...filterEnv(envProd), ...filterEnv(envStaging)];
};

const generate = (): void => {
  const envVariables = contents();

  const typeDefs = envVariables
    .map(({ name, type }) => `"${name}": ${type};`)
    .join("\n    ");

  const output = `
declare namespace NodeJS {
  interface ProcessEnv {
    ${typeDefs}
  }
}`;

  fs.writeFileSync("env.d.ts", output, "utf8");
};

generate();
