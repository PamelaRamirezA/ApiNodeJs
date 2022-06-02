import {newDeliveryEntry,newBotEntry} from './types'
import {State} from './enums'

const isString = (string : string): boolean => {
    return typeof string == 'string'
} 
/*
const isDate = (date : string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (dateFromRequest: any): string => {
    if(!isString(dateFromRequest) || !isDate(dateFromRequest)){
        throw new Error('Incorrect or missing date')
        
    }
    return dateFromRequest
}*/

const isState = (param : any) : boolean => {
    return Object.values(State).includes(param)
}
const parseState =  (stateFromRequest : any) : State =>{
    if( !isString(stateFromRequest) || !isState(stateFromRequest)){
        throw new Error('Incorrect or missing state')
    }

    return stateFromRequest
}
const isNumber = (number : number) : boolean => {
    return Boolean(Number(number))
}
const parseNumber =  (numberFromRequest : any) : number =>{
    if( !isNumber(numberFromRequest)){
        throw new Error('Incorrect or missing number')
    }

    return numberFromRequest
}

const parseZone =  (zoneFromRequest : any) : string =>{
    if( !isString(zoneFromRequest)){
        throw new Error('Incorrect or missing zone id')
    }

    return zoneFromRequest
}

const toNewBotEntry = (object: any): newBotEntry => {
    const newEntry1 : newBotEntry={
        status: parseState(object.status),
        loc_lat : parseNumber(object.loc_lat),
        loc_lon : parseNumber(object.loc_lon),
        zone_id : parseZone(object.zone_id)
    }
    return newEntry1
}

const toNewDeliveryEntry = (object: any): newDeliveryEntry => {
    const newEntry : newDeliveryEntry={
        state: parseState(object.state),
        pickup : parseNumber(object.pickup),
        dropoff : parseNumber(object.dropoff),
        zone_id : parseZone(object.zone_id)
    }
    return newEntry
}

export default toNewDeliveryEntry;toNewBotEntry
