import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { departure, arrive, cargo, wagonType, email } = req.body;

    if (!departure || !arrive || !cargo || !wagonType || !email) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const text = `
📨 <b>Новая заявка</b>

🚉 <b>Отправление:</b> ${departure}
🏁 <b>Назначение:</b> ${arrive}
📦 <b>Груз:</b> ${cargo}
🚋 <b>Тип вагона:</b> ${wagonType}
📧 <b>Email:</b> ${email}
`;

    await bot.api.sendMessage(
      process.env.CHAT_ID!,
      text,
      { parse_mode: "HTML" }
    );

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Telegram error:", error);
    return res.status(500).json({ error: "Telegram error" });
  }
}
