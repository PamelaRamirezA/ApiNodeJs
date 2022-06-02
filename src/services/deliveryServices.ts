import moment from 'moment';
import { DeliveryEntry, newDeliveryEntry, NonSensitiveData } from '../types'
import deliveryData from './deliveries.json'
const deliveries: DeliveryEntry[] = deliveryData as DeliveryEntry[] 
const now = new Date();

export const getEntries = () : DeliveryEntry[] => deliveries;

export const findbyId = (id: string): DeliveryEntry | undefined=> {
    const entry = deliveries.find(d => d.id == id)
    if(entry !== null){
        return entry 
    }
    return undefined     
}
export const getEntriesWOSensitiveData = () : NonSensitiveData[] => {
    return deliveries.map(({id, creation_date,state,pickup,dropoff}) => {
        return {
            id, 
            creation_date,
            state,
            pickup,
            dropoff 
        }
    }
    )
} 

export const addDelivery =  (idgenerated : string,newDeliveryEntry: newDeliveryEntry): DeliveryEntry => {
    const newDelivery = {
        //id: String(Math.max(...collectionDB.map(d=> Number(d.id)))+1),
        id: idgenerated,
        creation_date: String(moment(now,"YYYY-MM-DD")),
        ...newDeliveryEntry
    }
    deliveries.push(newDelivery)
    return newDelivery
}


