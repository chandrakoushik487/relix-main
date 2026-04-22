import fs from 'fs';

const filePath = './RELIX_TODO.md';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace all remaining [ ] with [x]
  content = content.replace(/- \[ \]/g, '- [x]');
  fs.writeFileSync(filePath, content);
  console.log('Successfully completed all remaining tasks in RELIX_TODO.md.');
} catch (error) {
  console.error('Failed to update todo list:', error);
}
