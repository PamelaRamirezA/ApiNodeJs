import express from 'express'
import * as deliveryServices from '../services/deliveryServices'
import { DeliveryEntry } from '../types'
import toNewDeliveryEntry from '../utils'

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


router.get('/', (_req,res) => {
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', {deliveries: data})
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
//comment
router.get('/:id', (req,res) => {
   //const delivery = deliveryServices.findbyId(req.params.id)
    ref.orderByChild("id").equalTo(req.params.id).on('child_added', (snapshot) => {
        console.log(snapshot.key);
        const data = snapshot;
        res.render('index', {deliveries: data})
    })
})

router.post('/', (req,res) => {
    try{
        const newDeliveryEntry = toNewDeliveryEntry(req.body)
        /*ref.on('value', (snapshot : any) => {
            //console.log(snapshot.val());
            console.log('elemento leido '+ snapshot);
        }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
        }); 
        
        const idgen = ref.orderByChild('id').limitToFirst(1).Number()
        console.log ('idgen ' + idgen)
        */
        const addedDeliveryEntry = deliveryServices.addDelivery('1',newDeliveryEntry)
        db.ref('deliveries').push(addedDeliveryEntry)
        res.json(newDeliveryEntry)
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


