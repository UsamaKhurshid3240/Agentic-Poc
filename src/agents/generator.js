import axios from 'axios';
const OPENAI = process.env.OPENAI_API_KEY;

export async function generateTests(code, plan) {
  const prompt = `You are a test generation agent. Given JavaScript code:\n\n${code}\n\nAnd this test plan:\n${plan}\n\nGenerate Jest test file content. Use require(...) if needed and export nothing.`;
  const out = await callOpenAI(prompt);
  return out;
}

async function callOpenAI(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    max_tokens: 1000
  };
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI}` };
  const r = await axios.post(url, body, { headers });
  return r.data.choices[0].message.content;
}
