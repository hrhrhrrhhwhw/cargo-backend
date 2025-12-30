import express from "express";
import cors from "cors";
import { Bot } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!token) {
  throw new Error("BOT_TOKEN is missing");
}

if (!chatId) {
  throw new Error("CHAT_ID is missing");
}

const bot = new Bot(token);



app.post("/api/form", async (req, res) => {
  const data = req.body;

  try {
    await bot.api.sendMessage(
      chatId,
      `
📨 <b>Новая заявка</b>

🚉 Отправление: ${data.departure}
🏁 Назначение: ${data.arrive}
📦 Груз: ${data.cargo}
🚋 Вагон: ${data.wagonType}
📧 Email: ${data.email}
      `,
      { parse_mode: "HTML" }
    );

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Telegram error" });
  }
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
