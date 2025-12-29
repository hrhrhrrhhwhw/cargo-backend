require("dotenv").config({ override: true });


const express = require("express");
const cors = require("cors");
const { Bot } = require("grammy");

if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
  throw new Error("❌ BOT_TOKEN или CHAT_ID не заданы в .env");
}

const app = express();
const PORT = process.env.PORT || 4040;



// Telegram bot
const bot = new Bot(process.env.BOT_TOKEN);
const CHAT_ID = Number(process.env.CHAT_ID);

app.use(cors());
app.use(express.json());

app.post("/api/form", async (req, res) => {
  const { departure, arrive, cargo, wagonType, email } = req.body;

  const errors = {};

  if (!departure?.trim()) errors.departure = "Укажите станцию отправления";
  if (!arrive?.trim()) errors.arrive = "Укажите станцию назначения";
  if (!cargo) errors.cargo = "Выберите груз";
  if (!wagonType) errors.wagonType = "Выберите тип вагона";
  if (!email?.trim()) {
    errors.email = "Введите email";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Некорректный email";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // 📩 Формируем сообщение в Telegram
  const message = `
📨 <b>Новая заявка</b>

🚉 <b>Отправление:</b> ${departure}
🏁 <b>Назначение:</b> ${arrive}
📦 <b>Груз:</b> ${cargo}
🚋 <b>Тип вагона:</b> ${wagonType}
📧 <b>Email:</b> ${email}
`;

  try {
    await bot.api.sendMessage(CHAT_ID, message, {
      parse_mode: "HTML",
    });

    console.log("FORM DATA:", req.body);

    res.json({ success: true });
  } catch (error) {
    console.error("Telegram error:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка отправки в Telegram",
    });
  }
});

