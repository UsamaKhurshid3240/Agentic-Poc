// Placeholder module showing where LlamaIndex integration would happen.
// For a real integration, you would use the llama-index (or similar) SDK to:
// - create Documents
// - build VectorStoreIndex
// - query relevant chunks to supply context to the LLM.
//
// This file intentionally keeps a minimal interface so you can replace it
// with real LlamaIndex calls later.

export async function createIndexFromDoc(doc) {
  // noop for POC
  return { indexId: 'local-placeholder' };
}

export async function queryIndex(index, q) {
  // just return the original doc text as relevant context
  return doc.text || '';
}
