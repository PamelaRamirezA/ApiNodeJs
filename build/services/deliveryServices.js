"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDelivery = exports.getEntriesWOSensitiveData = exports.findbyId = exports.getEntries = void 0;
const moment_1 = __importDefault(require("moment"));
const deliveries_json_1 = __importDefault(require("./deliveries.json"));
const deliveries = deliveries_json_1.default;
const now = new Date();
const getEntries = () => deliveries;
exports.getEntries = getEntries;
const findbyId = (id) => {
    const entry = deliveries.find(d => d.id == id);
    if (entry !== null) {
        return entry;
    }
    return undefined;
};
exports.findbyId = findbyId;
const getEntriesWOSensitiveData = () => {
    return deliveries.map(({ id, creation_date, state, pickup, dropoff }) => {
        return {
            id,
            creation_date,
            state,
            pickup,
            dropoff
        };
    });
};
exports.getEntriesWOSensitiveData = getEntriesWOSensitiveData;
const addDelivery = (idgenerated, newDeliveryEntry) => {
    const newDelivery = Object.assign({ 
        //id: String(Math.max(...collectionDB.map(d=> Number(d.id)))+1),
        id: idgenerated, creation_date: String((0, moment_1.default)(now, "YYYY-MM-DD")) }, newDeliveryEntry);
    deliveries.push(newDelivery);
    return newDelivery;
};
exports.addDelivery = addDelivery;
