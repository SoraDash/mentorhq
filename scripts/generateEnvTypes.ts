import fs from 'fs';

const contents = () => {
  const env = getFileContents('.env');
  const envStaging = getFileContents('.env.staging');
  const envProd = getFileContents('.env.prod');

  return [...filterEnv(env), ...filterEnv(envProd), ...filterEnv(envStaging)];
};

const getFileContents = (filename: string) => {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n');
  }

  return [];
};

const filterEnv = (lines: string[]) => {
  return lines
    .filter((line) => line.includes('='))
    .map((line) => {
      const [name] = line.split('=');

      return { name, type: 'string' };
    });
};

const getExistingEnvCount = () => {
  if (fs.existsSync('env.d.ts')) {
    const content = fs.readFileSync('env.d.ts', 'utf8');

    const regex = /^(?:.*\n){2}([\s\S]*)/;

    const matches: string[] = content.match(regex) || [];

    if (matches) {
      const lines = matches[1]
        .split('\n')
        .filter(
          (line) => /^[A-Z]/.test(line.trim()) && !line.trim().startsWith('#'),
        );

      const varsCount = lines.length;

      return varsCount;
    } else {
      return 0;
    }
  }

  return 0;
};

const generate = () => {
  const existingCount = getExistingEnvCount();

  const envVariables = contents();

  const typeDefs = envVariables
    .filter(({ name }) => !name.startsWith('#'))
    .map(({ name, type }) => `${name}: ${type};`)
    .sort()
    .join('\n    ');

  const output = `declare namespace NodeJS {
  interface ProcessEnv {
    ${typeDefs}
  }
}
`;

  fs.writeFileSync('env.d.ts', output, 'utf8');

  const newCount = typeDefs.split('\n').length;
  const difference = newCount - existingCount;

  if (difference > 0) {
    console.log(`Added ${difference} new environment variable entries.`);
  } else if (difference < 0) {
    console.log(
      `Removed ${Math.abs(difference)} environment variable entries.`,
    );
  } else {
    console.log('No changes to environment variable entries.');
  }
};

console.log('Starting the generation process...');
generate();
console.log('Generation process completed.');
