"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBot = exports.findbyId = exports.getEntries = void 0;
const bot_json_1 = __importDefault(require("./bot.json"));
const bot = bot_json_1.default;
const getEntries = () => bot;
exports.getEntries = getEntries;
const findbyId = (id) => {
    const entry = bot.find(d => d.id == id);
    if (entry !== null) {
        return entry;
    }
    return undefined;
};
exports.findbyId = findbyId;
const addBot = (idgenerated, newBotEntry) => {
    const newBot = Object.assign({ 
        //id: String(Math.max(...collectionDB.map(d=> Number(d.id)))+1),
        id: idgenerated }, newBotEntry);
    //bot.push(newBot)
    return newBot;
};
exports.addBot = addBot;
