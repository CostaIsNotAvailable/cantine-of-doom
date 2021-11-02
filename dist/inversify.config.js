"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var types_1 = require("./types");
var services_1 = require("./services");
var container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.MongoHandler).to(services_1.MongoHandler);
