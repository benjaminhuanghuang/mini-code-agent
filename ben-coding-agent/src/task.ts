import { ApiConfiguration, ApiHandler } from "./apiHandler";

export class Task {
  constructor(
    private apiConfiguration: ApiConfiguration,
    private message: string
  ) {}
  public start() {
    const apiHandler = new ApiHandler(this.apiConfiguration);
    const systemPrompt = `You are a helpful coding assistant. Your task is to assist with the following message: ${this.message}`;
    const messages: string[] = [];

    apiHandler.createMessage(systemPrompt, this.message);
  }
}
