const { execSync } = require('child_process');

const requiredPnpmVersion = '8.0.0'; // Replace with your required version
const currentVersion = execSync('pnpm -v', { encoding: 'utf-8' }).trim();

if (currentVersion < requiredPnpmVersion) {
  console.error(
    `You must have pnpm version ${requiredPnpmVersion} or higher installed.`
  );
  process.exit(1);
}
