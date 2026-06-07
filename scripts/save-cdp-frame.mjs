import fs from 'node:fs';

const [, , jsonPath, outPath] = process.argv;
const raw = fs.readFileSync(jsonPath, 'utf8');
const json = JSON.parse(raw);
const data = json.result?.data || json.data;

if (!data) {
  console.error('No screenshot data in', jsonPath);
  process.exit(1);
}

fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
console.log('saved', outPath);
