import axios from 'axios';
const OPENAI = process.env.OPENAI_API_KEY;

export async function planTests(analysis) {
  const analysisText = typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2);
  const prompt = `You are a test planning agent. Given the following code analysis, produce a bullet list of unit tests (one-liners) that should be generated.\n\nAnalysis:\n${analysisText}\n\nReturn only a plain bullet list.`;
  const plan = await callOpenAI(prompt);
  return plan;
}

async function callOpenAI(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.0,
    max_tokens: 500
  };
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI}` };
  const r = await axios.post(url, body, { headers });
  return r.data.choices[0].message.content;
}
