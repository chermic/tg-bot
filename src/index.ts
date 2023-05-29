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

const port =
  typeof process.env.PORT === "string" && process.env.PORT?.length > 0
    ? Number.parseInt(process.env.PORT, 10)
    : 3000;

const fastify = Fastify({ logger: true });

const baseTgUrl = "https://api.telegram.com";
const telegramUrl = new URL(
  `/bot${process.env.BOT_TOKEN}/sendMessage`,
  baseTgUrl
);
const jokeUrl = "https://v2.jokeapi.dev/joke/Programming?type=single";

fastify.get("/", (request, response) => {
  response.send({ ok: true });
});

fastify.post("/new-message", async (request, response) => {
  try {
    const message = (request.body as { message?: any })?.message;
    const text = message?.text?.toLowerCase()?.trim();
    const chatId = message?.chat?.id;

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    console.log(
      "🚀 ~ file: index.ts:38 ~ fastify.post ~ tgResponse:",
      tgResponse
    );

    response.type("application/json").code(200);
    return { ok: true };
  } catch (error) {
    console.log("🚀 ~ file: index.ts:43 ~ fastify.post ~ error:", error);
    response.type("application/json").code(400);
    return { ok: false, error: error instanceof Error ? error.message : null };
  }
});

fastify.listen({ port }, (error, address) => {
  if (error) {
    throw error;
  }
});
