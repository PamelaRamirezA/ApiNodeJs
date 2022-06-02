import express from 'express'
import * as deliveryServices from '../services/deliveryServices'
import * as botServices from '../services/botsServices'
import { DeliveryEntry } from '../types'
import toNewDeliveryEntry from '../utils'
import toNewBotEntry1 from '../utils_bots'
import toNewBotEntry from '../utils_bots'

const admin = require('firebase-admin')
const serviceAccount = require("../../serviceAccount.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://delivery-api1-default-rtdb.firebaseio.com/'
})

const db = admin.database()
const app = express();
const router = express.Router()
const ref = db.ref('deliveries')
const refbots = db.ref('bots')


router.get('/', (_req,res) => {
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', {deliveries: data})
    })
    refbots.once('value', (snapshot) => {
        const data = snapshot.val();
        console.log (data)
        //res.render('index', {deliveries: data})
    })
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
})
router.get('/:id', (req,res) => {
    const data = undefined
   //const delivery = deliveryServices.findbyId(req.params.id)
    res.render('index', {deliveries: data})
    ref.orderByChild("id").equalTo(req.params.id).on('child_added', (snapshot) => {
        console.log(snapshot.key);
        res.render('index', {deliveries: snapshot.val()})
    })
})

router.post('/', (req,res) => {
    try{
        const newDeliveryEntry = toNewDeliveryEntry(req.body)
        const addedDeliveryEntry = deliveryServices.addDelivery('1',newDeliveryEntry)
        db.ref('deliveries').push(addedDeliveryEntry)
        res.json(newDeliveryEntry)
    }catch(e){
        res.status(400)//.send(e.message)
    }
    
})
router.post('/new_bot', (req,res) => {
    try{
        console.log(req.body)
        const newBotEntry = toNewBotEntry1(req.body)
        console.log("hola "+newBotEntry)
        const addedBotEntry = botServices.addBot('1',newBotEntry)
        db.ref('bots').push(addedBotEntry)
        res.json(newBotEntry)
    }catch(e){
        res.status(400)//.send(e.message)
    }
    
})
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
export default router


