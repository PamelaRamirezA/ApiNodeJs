"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const isString = (string) => {
    return typeof string == 'string';
};
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
const isState = (param) => {
    return Object.values(enums_1.State).includes(param);
};
const parseState = (stateFromRequest) => {
    if (!isString(stateFromRequest) || !isState(stateFromRequest)) {
        throw new Error('Incorrect or missing state');
    }
    return stateFromRequest;
};
const isNumber = (number) => {
    return Boolean(Number(number));
};
const parseNumber = (numberFromRequest) => {
    if (!isNumber(numberFromRequest)) {
        throw new Error('Incorrect or missing number');
    }
    return numberFromRequest;
};
const parseZone = (zoneFromRequest) => {
    if (!isString(zoneFromRequest)) {
        throw new Error('Incorrect or missing zone id');
    }
    return zoneFromRequest;
};
const toNewBotEntry = (object) => {
    const newEntry1 = {
        status: parseState(object.status),
        loc_lat: parseNumber(object.loc_lat),
        loc_lon: parseNumber(object.loc_lon),
        zone_id: parseZone(object.zone_id)
    };
    return newEntry1;
};
const toNewDeliveryEntry = (object) => {
    const newEntry = {
        state: parseState(object.state),
        pickup: parseNumber(object.pickup),
        dropoff: parseNumber(object.dropoff),
        zone_id: parseZone(object.zone_id)
    };
    return newEntry;
};
exports.default = toNewDeliveryEntry;
toNewBotEntry;
