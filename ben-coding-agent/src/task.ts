import { OpenAI } from "openai";
import { ApiConfiguration, ApiHandler } from "./apiHandler";
import { Agent } from "http";
import { AgentWebViewProvider } from "./AgentWebViewProvider";

export class Task {
  constructor(
    private provider: AgentWebViewProvider,
    private apiConfiguration: ApiConfiguration,
    private message: string
  ) {}
  public async start() {
    const apiHandler = new ApiHandler(this.apiConfiguration);
    const systemPrompt = `You are a helpful coding assistant. Your task is to assist with the following message: ${this.message}`;
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "user", content: this.message },
    ];

    const stream = apiHandler.createMessage(systemPrompt, messages);
    for await (const chunk of stream) {
      if (chunk.content) {
        this.provider.postMessage(chunk.content);
      }
    }
  }
}
