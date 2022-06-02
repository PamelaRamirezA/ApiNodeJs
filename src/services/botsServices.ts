import { BotEntry, newBotEntry } from '../types'
import BotData from './bot.json'
const bot: BotEntry[] = BotData as BotEntry[] 

export const getEntries = () : BotEntry[] => bot;

export const findbyId = (id: string): BotEntry | undefined=> {
    const entry = bot.find(d => d.id == id)
    if(entry !== null){
        return entry 
    }
    return undefined     
}

export const addBot =  (idgenerated : string,newBotEntry: newBotEntry): BotEntry => {
    const newBot = {
        //id: String(Math.max(...collectionDB.map(d=> Number(d.id)))+1),
        id: idgenerated,
        ...newBotEntry
    }
    bot.push(newBot)
    return newBot
}


