import { OpenAIChatModels } from "@/utils/OpenAI";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = (req.headers["authorization"] as string)?.split(" ")[1];
  if (!apiKey) {
    return res.status(401).json({ error: "Missing token" });
  }

  const openAi = new OpenAI({
    apiKey,
  })

  try {
    const { data } = await openAi.models.list();

    // Get the list of models
    const models = data.map(({ id }) => id);

    // Get the models that can interface with the chat API and return
    const chatModels = models
      .filter((model) => model in OpenAIChatModels)
      .map((model) => OpenAIChatModels[model as keyof typeof OpenAIChatModels])
      .sort((a, b) => (b.maxLimit || 0) - (a.maxLimit || 0)); // Sort by max limit

    return res.status(200).json({
      models,
      chatModels,
    });
  } catch (e: any) {
    if (e.response) {
      return res.status(e.response.status).json({ error: e.response.data });
    }

    return res.status(500).json({ error: e.message });
  }
}
