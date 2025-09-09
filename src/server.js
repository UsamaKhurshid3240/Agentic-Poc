import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { readDocument } from './agents/reader.js';
import { analyzeCode } from './agents/analyzer.js';
import { planTests } from './agents/planner.js';
import { generateTests } from './agents/generator.js';
// import { saveTestsToFile } from './utils.js';
const app = express();
app.use(bodyParser.json({ limit: '1mb' }));
const PORT = process.env.PORT || 3000;

app.post('/generate-tests', async (req, res) => {
  try {
    const {  code } = req.body;
    if (!code) return res.status(400).json({ error: 'code required in body' });

    // Reader Agent
    const doc =  code ;

    // Analyzer Agent
    const analysis = await analyzeCode(doc);

    // Planner Agent
    const plan = await planTests(analysis);

    // Generator Agent
    const tests = await generateTests(doc.text, plan);

    // Optionally save tests to local file
    // const outPath = await saveTestsToFile('test', tests);

    res.json({ success: true, tests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.get('/', (req, res) => res.send('Agentic Llama POC running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
