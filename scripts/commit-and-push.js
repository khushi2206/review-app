#!/usr/bin/env node
// Cross-platform helper to add, commit and push changes.
// Usage: node scripts/commit-and-push.js "commit message"
const { execSync } = require('child_process');
const msg = process.argv.slice(2).join(' ') || `chore: update ${new Date().toISOString()}`;
try {
  console.log('Staging changes...');
  execSync('git add -A', { stdio: 'inherit' });
  console.log(`Committing with message: ${msg}`);
  try {
    execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  } catch (err) {
    console.log('No changes to commit or commit failed.');
  }
  console.log('Pushing to origin main...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('Done.');
} catch (err) {
  console.error('Failed to commit and push:', err.message);
  process.exit(1);
}
