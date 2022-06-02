import {newBotEntry} from './types'
import {State} from './enums'

const isString = (string : string): boolean => {
    return typeof string == 'string'
} 
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
const toNewBotEntry1 = (object : any) : newBotEntry => {
    const newEntry2 : newBotEntry={
        status : parseState(object.status),
        location: {
            lat: parseNumber(object.location.lat),
            lon: parseNumber(object.location.lon)
        },
        zone_id: parseZone(object.zone_id),
    }
    return newEntry2
}
export default toNewBotEntry1;
