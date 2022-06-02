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
const utils_1 = __importDefault(require("../utils"));
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
router.get('/', (_req, res) => {
    //res.send(deliveryServices.getEntriesWOSensitiveData())
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
    //const delivery = deliveryServices.findbyId(req.params.id)
    ref.orderByChild("id").equalTo('id').on('child_added', (snapshot) => {
        console.log(snapshot.key);
        const data = snapshot.val();
        res.render('index', { deliveries: data });
    });
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
    });
});
router.post('/', (req, res) => {
    try {
        const newDeliveryEntry = (0, utils_1.default)(req.body);
        /*ref.on('value', (snapshot : any) => {
            //console.log(snapshot.val());
            console.log('elemento leido '+ snapshot);
        }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
        });
        
        const idgen = ref.orderByChild('id').limitToFirst(1).Number()
        console.log ('idgen ' + idgen)
        */
        const addedDeliveryEntry = deliveryServices.addDelivery('1', newDeliveryEntry);
        db.ref('deliveries').push(addedDeliveryEntry);
        res.json(newDeliveryEntry);
    }
    catch (e) {
        res.status(400); //.send(e.message)
    }
});
/*
router.post('/new-delivery', (req,res) => {
    try{
        const newDeliveryEntry = toNewDeliveryEntry(req.body)

        const addedDeliveryEntry = deliveryServices.addDelivery(newDeliveryEntry)
    
        res.json(addedDeliveryEntry)
    }catch(e){
        res.status(400)//.send(e.message)
    }
    
})
*/
exports.default = router;
