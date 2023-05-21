import Fastify from "fastify";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from "dotenv";
config();

// const bot = new Telegraf(process.env.BOT_TOKEN ?? "");

// bot.on("message", (ctx) => {
//   const { id } = ctx.chat;

//   ctx.reply("Reply");
// });

// const launchBot = () => {
//   bot.launch();
// };

const fastify = Fastify({ logger: true });

const baseUrl = "https://api.telegram.com";
const telegramUrl = new URL(`bot${process.env.BOT_TOKEN}/sendMessage`, baseUrl);
const jokeUrl = "https://v2.jokeapi.dev/joke/Programming?type=single";

fastify.post("/new-message", async (request, response) => {
  const { message } = request.body as { message: any };
  console.log({ message });
  const text = message?.text?.toLowerCase()?.trim();
  const chatId = message?.chat?.id;

  await fetch(telegramUrl, {
    method: "POST",
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  response.type("application/json").code(200);
  return { status: "ok" };
});

fastify.listen({ port: 3000 }, (error, address) => {
  if (error) {
    throw error;
  }
});
