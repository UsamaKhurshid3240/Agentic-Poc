import fs from 'fs';
import path from 'path';

export async function saveTestsToFile(filename, tests) {
  const outDir = path.join(process.cwd(), 'tests');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const base = path.basename(filename).replace(/\.js$/, '');
  const outPath = path.join(outDir, base + '.test.js');
  fs.writeFileSync(outPath, tests, 'utf-8');
  return outPath;
}
