import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi, Configuration } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = (req.headers["authorization"] as string)?.split(" ")[1];
  if (!apiKey) {
    return res.status(401).json({ error: "Missing token" });
  }

  const configuration = new Configuration({
    apiKey,
  });

  const openAi = new OpenAIApi(configuration);

  const { data } = await openAi.listModels();

  return res.status(200).json(data);
}
