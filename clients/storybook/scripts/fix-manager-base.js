import fs from 'node:fs';
import path from 'node:path';

const baseTag = '<base href="/storybook/">';
const filePath = path.resolve(process.cwd(), 'build', 'index.html');

if (!fs.existsSync(filePath)) {
  console.error(`storybook build output not found: ${filePath}`);
  process.exit(1);
}

let html = fs.readFileSync(filePath, 'utf8');

// Remove any existing <base> tags to avoid duplicates before reinserting at the top.
// Some builds may emit <base href="/storybook"> (no trailing slash), which breaks iframe URLs.
html = html.replace(/^\s*<base href="[^"]*">\s*$/gm, '');

if (html.includes('<meta charset="utf-8" />')) {
  html = html.replace('<meta charset="utf-8" />', `<meta charset="utf-8" />\n    ${baseTag}`);
} else if (html.includes('<head>')) {
  html = html.replace('<head>', `<head>\n    ${baseTag}`);
} else {
  console.error('Failed to find <head> in Storybook index.html');
  process.exit(1);
}

fs.writeFileSync(filePath, html);
