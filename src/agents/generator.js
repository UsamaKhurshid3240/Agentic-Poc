import axios from 'axios';
const OPENAI = process.env.OPENAI_API_KEY;

export async function generateTests(code, plan) {
  const prompt = `You are a test generation agent. Given JavaScript code:\n\n${code}\n\nAnd this test plan:\n${plan}\n\nGenerate Jest test file content. Use require(...) if needed and export nothing.`;
  const out = await callOpenAI(prompt);
  return out;
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