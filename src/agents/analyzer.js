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
