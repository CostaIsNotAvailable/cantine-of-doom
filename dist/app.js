"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
var helpers_1 = require("./helpers");
var app = express_1.default();
var port = 5000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/status', function (req, res) {
    res.json({
        success: true
    });
});
app.use(routes_1.routes);
// Error handling after endpoints to catch all thrown errors
app.use(helpers_1.errorHandler);
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
