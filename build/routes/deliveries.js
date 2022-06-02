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
const deliveryServices = __importStar(require("../services/deliveryServices"));
const botServices = __importStar(require("../services/botsServices"));
const utils_1 = __importDefault(require("../utils"));
const utils_bots_1 = __importDefault(require("../utils_bots"));
const admin = require('firebase-admin');
const serviceAccount = require("../../serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://delivery-api1-default-rtdb.firebaseio.com/'
});
const db = admin.database();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const ref = db.ref('deliveries');
const refbots = db.ref('bots');
router.get('/', (_req, res) => {
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { deliveries: data });
    });
    /*
    ref.on('value', (snapshot : any) => {
        console.log(snapshot.val());
      }, (errorObject: any) => {
        console.log('The read failed: ' + errorObject.name);
      });
*/
    /*const result = ref.get()
    //res.render('index', {deliveries: result})
    console.log('result '+result)
    */
});
router.get('/:id', (req, res) => {
    const data = undefined;
    //const delivery = deliveryServices.findbyId(req.params.id)
    res.render('index', { deliveries: data });
    ref.orderByChild("id").equalTo(req.params.id).on('child_added', (snapshot) => {
        console.log(snapshot.key);
        res.render('index', { deliveries: snapshot.val() });
    });
});
router.get('/bots', (_req, res) => {
    console.log('/bots');
    refbots.once('value', (snapshot) => {
        const data = snapshot.val();
        //res.render('index', {deliveries: data})
    });
    /*
    ref.on('value', (snapshot : any) => {
        console.log(snapshot.val());
      }, (errorObject: any) => {
        console.log('The read failed: ' + errorObject.name);
      });
*/
    /*const result = ref.get()
    //res.render('index', {deliveries: result})
    console.log('result '+result)
    */
});
router.post('/', (req, res) => {
    try {
        const newDeliveryEntry = (0, utils_1.default)(req.body);
        const addedDeliveryEntry = deliveryServices.addDelivery('1', newDeliveryEntry);
        db.ref('deliveries').push(addedDeliveryEntry);
        res.json(newDeliveryEntry);
    }
    catch (e) {
        res.status(400); //.send(e.message)
    }
});
router.post('/new_bot', (req, res) => {
    try {
        console.log(req.body);
        const newBotEntry = (0, utils_bots_1.default)(req.body);
        const addedBotEntry = botServices.addBot('1', newBotEntry);
        db.ref('bots').push(addedBotEntry);
        res.json(newBotEntry);
    }
    catch (e) {
        res.status(400); //.send(e.message)
    }
});
exports.default = router;
