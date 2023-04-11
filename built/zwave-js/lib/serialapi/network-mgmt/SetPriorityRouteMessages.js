"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetPriorityRouteResponse = exports.SetPriorityRouteRequest = void 0;
const core_1 = require("@zwave-js/core");
const serial_1 = require("@zwave-js/serial");
const shared_1 = require("@zwave-js/shared");
let SetPriorityRouteRequest = class SetPriorityRouteRequest extends serial_1.Message {
    constructor(host, options) {
        super(host, options);
        if ((0, serial_1.gotDeserializationOptions)(options)) {
            throw new core_1.ZWaveError(`${this.constructor.name}: deserialization not implemented`, core_1.ZWaveErrorCodes.Deserialization_NotImplemented);
        }
        else {
            if (options.repeaters.length > core_1.MAX_REPEATERS ||
                options.repeaters.some((id) => id < 1 || id > core_1.MAX_NODES)) {
                throw new core_1.ZWaveError(`The repeaters array must contain at most ${core_1.MAX_REPEATERS} node IDs between 1 and ${core_1.MAX_NODES}`, core_1.ZWaveErrorCodes.Argument_Invalid);
            }
            this.destinationNodeId = options.destinationNodeId;
            this.repeaters = options.repeaters;
            this.routeSpeed = options.routeSpeed;
        }
    }
    serialize() {
        this.payload = Buffer.from([
            this.destinationNodeId,
            this.repeaters[0] ?? 0,
            this.repeaters[1] ?? 0,
            this.repeaters[2] ?? 0,
            this.repeaters[3] ?? 0,
            this.routeSpeed,
        ]);
        return super.serialize();
    }
    toLogEntry() {
        return {
            ...super.toLogEntry(),
            message: {
                "node ID": this.destinationNodeId,
                repeaters: this.repeaters.length > 0
                    ? this.repeaters.join(" -> ")
                    : "none",
                "route speed": (0, shared_1.getEnumMemberName)(core_1.ZWaveDataRate, this.routeSpeed),
            },
        };
    }
};
SetPriorityRouteRequest = __decorate([
    (0, serial_1.messageTypes)(serial_1.MessageType.Request, serial_1.FunctionType.SetPriorityRoute),
    (0, serial_1.priority)(core_1.MessagePriority.Normal),
    (0, serial_1.expectedResponse)(serial_1.FunctionType.SetPriorityRoute)
], SetPriorityRouteRequest);
exports.SetPriorityRouteRequest = SetPriorityRouteRequest;
let SetPriorityRouteResponse = class SetPriorityRouteResponse extends serial_1.Message {
    constructor(host, options) {
        super(host, options);
        this.success = this.payload[0] !== 0;
    }
    isOK() {
        return this.success;
    }
    toLogEntry() {
        return {
            ...super.toLogEntry(),
            message: { success: this.success },
        };
    }
};
SetPriorityRouteResponse = __decorate([
    (0, serial_1.messageTypes)(serial_1.MessageType.Response, serial_1.FunctionType.SetPriorityRoute)
], SetPriorityRouteResponse);
exports.SetPriorityRouteResponse = SetPriorityRouteResponse;
//# sourceMappingURL=SetPriorityRouteMessages.js.map