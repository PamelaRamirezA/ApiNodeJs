"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const isString = (string) => {
    return typeof string == 'string';
};
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
const toNewBotEntry1 = (object) => {
    const newEntry2 = {
        status: parseState(object.status),
        /*location: {
            lat: parseNumber(object.location.lat),
            lon: parseNumber(object.location.lon)
        },*/
        zone_id: parseZone(object.zone_id),
    };
    console.log('toNewBotEntry1');
    return newEntry2;
};
exports.default = toNewBotEntry1;
