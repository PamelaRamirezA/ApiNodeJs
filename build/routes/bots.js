"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BotServices = __importStar(require("../services/botsServices"));
const utils_bots_1 = __importDefault(require("../utils_bots"));
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
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        //res.render('index', {bots: data})
        console.log(snapshot.val());
    });
    /*ref.on('value', (snapshot : any) => {
        console.log(snapshot.val());
      }, (errorObject: any) => {
        console.log('The read failed: ' + errorObject.name);
      });

    const bot2 = ref.orderByChild('id').equalTo(req.params.id)
    //console.log(bot2)
    return bot2
        ? res.send(bot2)
        : res.sendStatus(400)
        */
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
router.post('/', (req, res) => {
    try {
        const newBotEntry = (0, utils_bots_1.default)(req.body);
        /*ref.on('value', (snapshot : any) => {
            //console.log(snapshot.val());
            console.log('elemento leido '+ snapshot);
        }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
        });
        
        const idgen = ref.orderByChild('id').limitToFirst(1).Number()
        console.log ('idgen ' + idgen)
        */
        const addedBotEntry = BotServices.addBot('1', newBotEntry);
        db.ref('bots').push(addedBotEntry);
        res.json(newBotEntry);
    }
    catch (e) {
        res.status(400); //.send(e.message)
    }
});
exports.default = router;
