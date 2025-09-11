import axios from 'axios';
const OPENAI = process.env.OPENAI_API_KEY;

export async function planTests(analysis) {
  const analysisText = typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2);
  const prompt = `You are a test planning agent. Given the following code analysis, produce a bullet list of unit tests (one-liners) that should be generated.\n\nAnalysis:\n${analysisText}\n\nReturn only a plain bullet list.`;
  const plan = await callOpenAI(prompt);
  return plan;
}

async function callOpenAI(prompt) {
  const url = "http://localhost:11434/api/generate";
   const body = {
    model: "qwen:0.5b",
    prompt,
    stream: false, 
  };
  const headers = { 'Content-Type': 'application/json' };
  const r = await axios.post(url, body, { headers });
  return   r.data.response;
}