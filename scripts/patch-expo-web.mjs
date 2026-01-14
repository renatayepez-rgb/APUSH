import fs from 'node:fs';
import path from 'node:path';

const distIndex = path.join(process.cwd(), 'apps', 'apush', 'dist', 'index.html');

if (!fs.existsSync(distIndex)) {
  console.error(`patch-expo-web: missing ${distIndex}`);
  process.exit(1);
}

let html = fs.readFileSync(distIndex, 'utf8');

// Expo web export currently emits a classic script tag, but the bundle can contain `import.meta`.
// Ensure the bundle is loaded as an ES module to avoid:
// "Uncaught SyntaxError: Cannot use 'import.meta' outside a module"
if (!html.includes('type="module"') && html.includes('/_expo/static/js/web/')) {
  html = html.replace(
    /<script\s+src="([^"]*\/_expo\/static\/js\/web\/[^"]+\.js)"\s+defer><\/script>/,
    '<script type="module" src="$1"></script>'
  );
}

fs.writeFileSync(distIndex, html);
console.log('patch-expo-web: patched dist/index.html');

