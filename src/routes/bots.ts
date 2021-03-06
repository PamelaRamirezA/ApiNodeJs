import express from 'express'
import * as BotServices from '../services/botsServices'
import toNewBotEntry1 from '../utils_bots'

const admin = require('firebase-admin')
const serviceAccount = require("../../serviceAccount.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://delivery-api1-default-rtdb.firebaseio.com/'
})
const db = admin.database()

const router = express.Router()
const ref = db.ref('bots')

router.get('/:id', (req,res) => {  
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        //res.render('index', {bots: data})
        console.log(snapshot.val());
    })
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
})

router.get('/:id', (req,res) => {
   ref.on('value', (snapshot : any) => {
        console.log(snapshot.val());
    }, (errorObject: any) => {
        console.log('The read failed: ' + errorObject.name);
    }); 
    

   const bot = ref.orderByChild('id').equalTo(req.params.id)
    return bot 
        ? res.send(bot)
        : res.sendStatus(400) 
})

router.post('/', (req,res) => {
    try{
        const newBotEntry = toNewBotEntry1(req.body)
        /*ref.on('value', (snapshot : any) => {
            //console.log(snapshot.val());
            console.log('elemento leido '+ snapshot);
        }, (errorObject: any) => {
            console.log('The read failed: ' + errorObject.name);
        }); 
        
        const idgen = ref.orderByChild('id').limitToFirst(1).Number()
        console.log ('idgen ' + idgen)
        */
        const addedBotEntry = BotServices.addBot('1',newBotEntry)
        db.ref('bots').push(addedBotEntry)
        res.json(newBotEntry)
    }catch(e){
        res.status(400)//.send(e.message)
    }
    
})
export default router


