// bot/bot.js
import { Telegraf } from 'telegraf';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const API = process.env.BACKEND_URL;

bot.start((ctx) => {
  ctx.reply('👋 Hi! Send me a long URL, and I’ll give you a short one!');
});

bot.on('text', async (ctx) => {
  const longUrl = ctx.message.text;

  if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
    return ctx.reply('❌ Please send a valid URL starting with http:// or https://');
  }

  try {
    const res = await axios.post(`${API}/shorten`, { longUrl });
    ctx.reply(`✅ Short URL:\n${res.data.shortUrl}`);
  } catch (err) {
    console.error(err.message);
    ctx.reply('⚠️ Could not shorten the URL. Please try again.');
  }
});

bot.launch();
console.log('🤖 Telegram bot is running...');
