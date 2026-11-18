import { streamText, type ModelMessage } from 'ai';
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from './gateway-helpers.server.ts';

export function createGeminiCall(request: Request, apiKey: string, messages: ModelMessage[], instructions: string) {
  const provider = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request), { baseURL: 'https://ai.gateway.lovable.dev/v1' });
  return streamText({
    model: provider('google/gemini-3.8-flash'),
    system: instructions,
    messages,
    abortSignal: request.signal,
    maxRetries: 0,
  });
}