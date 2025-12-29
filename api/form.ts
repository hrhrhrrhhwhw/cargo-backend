import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body;

  console.log("Получены данные:", data);

  // TODO: отправка в Telegram

  return res.status(200).json({ ok: true });
}
