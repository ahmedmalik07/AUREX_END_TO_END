const { execSync } = require('child_process');

const ports = [3000, 3001, 8002];

for (const port of ports) {
  try {
    execSync(`npx kill-port ${port}`, { stdio: 'inherit' });
  } catch {
    // ignore if nothing to kill
  }
}

console.log('Ports cleared.\n');
