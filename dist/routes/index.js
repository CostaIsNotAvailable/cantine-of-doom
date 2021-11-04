"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var authRoutes_1 = __importDefault(require("./authRoutes"));
var recipesRoutes_1 = __importDefault(require("./recipesRoutes"));
exports.routes = [authRoutes_1.default, recipesRoutes_1.default];
