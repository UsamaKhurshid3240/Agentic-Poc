# Agentic Llama POC (Node.js)

This is a minimal Proof-of-Concept demonstrating an *agentic* pipeline that generates Jest test cases
from provided code using multiple agents (Reader -> Analyzer -> Planner -> Generator). It uses
OpenAI's Chat Completions API (you must supply `OPENAI_API_KEY`) and exposes a simple HTTP endpoint.

## Files
- `src/server.js` : Express server and API endpoint `/generate-tests`
- `src/agents/reader.js` : Loads code/document (here takes code from request body)
- `src/agents/analyzer.js` : Calls OpenAI to analyze code (extract functions)
- `src/agents/planner.js` : Calls OpenAI to plan test cases
- `src/agents/generator.js` : Calls OpenAI to generate Jest tests from plan
- `src/agents/llama_wrapper.js` : Lightweight placeholder to illustrate where LlamaIndex integration would sit

## Setup
1. Copy `.env.example` to `.env` and fill your `OPENAI_API_KEY`.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Use POST /generate-tests with JSON body:
   ```
   { "filename": "example.js", "code": "function add(a,b){return a+b}" }
   ```

## Notes
- This is a simple POC. For production use, integrate proper LlamaIndex or vector DB, add caching, rate limits, and error handling.
