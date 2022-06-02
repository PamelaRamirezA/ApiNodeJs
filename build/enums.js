"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.State = void 0;
var State;
(function (State) {
    State["Pending"] = "pending";
    State["Assigned"] = "assigned";
    State["InTransit"] = "in_transit";
    State["Delivered"] = "delivered";
})(State = exports.State || (exports.State = {}));
var Status;
(function (Status) {
    Status["Available"] = "available";
    Status["Busy"] = "busy";
    Status["Reserved"] = "reserved";
})(Status = exports.Status || (exports.Status = {}));
