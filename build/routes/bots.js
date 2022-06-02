"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import * as BotServices from '../services/botsServices'
const utils_1 = __importDefault(require("../utils"));
const admin = require('firebase-admin');
const serviceAccount = require("../../serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://delivery-api1-default-rtdb.firebaseio.com/'
});
const db = admin.database();
const router = express_1.default.Router();
const ref = db.ref('bots');
router.get('/:id', (req, res) => {
    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
    const bot2 = ref.orderByChild('id').equalTo(req.params.id);
    //console.log(bot2)
    return bot2
        ? res.send(bot2)
        : res.sendStatus(400);
});
router.get('/:id', (req, res) => {
    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
    const bot = ref.orderByChild('id').equalTo(req.params.id);
    return bot
        ? res.send(bot)
        : res.sendStatus(400);
});
router.post('/', (_req, res) => {
    try {
        const newBotEntry = utils_1.default;
        /*ref.on('value', (snapshot : any) => {
            //console.log(snapshot.val());
            console.log('elemento leido '+ snapshot);
        }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
        });
        
        const idgen = ref.orderByChild('id').limitToFirst(1).Number()
        console.log ('idgen ' + idgen)
        */
        //const addedBotEntry = BotServices.addBot('1',newBotEntry)
        //db.ref('bots').push(addedBotEntry)
        res.json(newBotEntry);
    }
    catch (e) {
        res.status(400); //.send(e.message)
    }
});
exports.default = router;
