const fs = require('fs');

const svg = fs.readFileSync('public/shield-favicon.svg', 'utf8');
const b64 = Buffer.from(svg).toString('base64');
let html = fs.readFileSync('index.html', 'utf8');

const linkTag = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,' + b64 + '" />';
html = html.replace(/<link rel="icon"[^>]*>/, linkTag);

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html with base64 favicon.');
