"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const bot = new Telegraf(process.env.BOT_TOKEN ?? "");
// bot.on("message", (ctx) => {
//   const { id } = ctx.chat;
//   ctx.reply("Reply");
// });
// const launchBot = () => {
//   bot.launch();
// };
const fastify = (0, fastify_1.default)({ logger: true });
const baseUrl = "https://api.telegram.com";
const telegramUrl = new URL(`bot${process.env.BOT_TOKEN}/sendMessage`, baseUrl);
const jokeUrl = "https://v2.jokeapi.dev/joke/Programming?type=single";
fastify.post("/new-message", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { message } = request.body;
    console.log({ message });
    const text = (_b = (_a = message === null || message === void 0 ? void 0 : message.text) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
    const chatId = (_c = message === null || message === void 0 ? void 0 : message.chat) === null || _c === void 0 ? void 0 : _c.id;
    yield fetch(telegramUrl, {
        method: "POST",
        body: JSON.stringify({ chat_id: chatId, text }),
    });
    response.type("application/json").code(200);
    return { status: "ok" };
}));
fastify.listen({ port: 3000 }, (error, address) => {
    if (error) {
        throw error;
    }
});
