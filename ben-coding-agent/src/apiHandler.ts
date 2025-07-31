import { OpenAI } from "openai";

export type ApiConfiguration = {
  modal: string;
  apiKey: string;
  apiUrl: string;
};

export class ApiHandler {
  constructor(private apiConfig: ApiConfiguration) {}

  async *createMessage(
    systemPrompt: string,
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  ) {
    const openai = new OpenAI({
      baseURL: this.apiConfig.apiUrl,
      apiKey: this.apiConfig.apiKey,
    });
    const request: OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming =
      {
        stream: true,
        model: this.apiConfig.modal,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      };

    const { data: completion } = await openai.chat.completions
      .create(request)
      .withResponse();

    for await (const chunk of completion) {
      if (chunk.choices[0].delta) {
        yield chunk.choices[0].delta.content;
      }
    }
  }
}
