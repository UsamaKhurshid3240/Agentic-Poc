import axios from 'axios';
const OPENAI = process.env.OPENAI_API_KEY;

export async function analyzeCode(doc) {
  const prompt = `You are an assistant that extracts function signatures and short descriptions from JavaScript code.\n\nCode:\n${doc.text}\n\nReturn a JSON array of functions with name, params and a 1-line description.`;
  const resp = await callOpenAI(prompt);
  // Try to parse JSON, but fallback to raw text
  try {
    const jsonStart = resp.indexOf('[');
    const jsonText = resp.slice(jsonStart);
    return JSON.parse(jsonText);
  } catch (e) {
    return { raw: resp };
  }
}

async function callOpenAI(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.0,
    max_tokens: 800
  };
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI}` };
  const r = await axios.post(url, body, { headers });
  return r.data.choices[0].message.content;
}
