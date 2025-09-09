// Reader Agent - converts incoming code into a document object (placeholder for LlamaIndex ingestion)
export async function readDocument({ filename = 'input.js', code = '' } = {}) {
  // In a full integration we'd create a LlamaIndex Document here
  return {
    text: code,
    metadata: { filename }
  };
}
