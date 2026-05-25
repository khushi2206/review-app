const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const examplePath = path.join(root, 'config.example.js');
const configPath = path.join(root, 'config.js');

const envKey = process.env.OPENROUTER_API_KEY?.trim();
const defaultContent = `window.APP_CONFIG = {
  OPENROUTER_API_KEY: "YOUR_API_KEY",
};
`;

if (envKey) {
  const content = `window.APP_CONFIG = {
  OPENROUTER_API_KEY: ${JSON.stringify(envKey)},
};
`;
  fs.writeFileSync(configPath, content, 'utf8');
  console.log('config.js written from OPENROUTER_API_KEY env');
} else if (!fs.existsSync(configPath)) {
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, configPath);
  } else {
    fs.writeFileSync(configPath, defaultContent, 'utf8');
  }
  console.log('config.js created from config.example.js');
} else {
  console.log('config.js unchanged (set OPENROUTER_API_KEY env on Vercel)');
}
