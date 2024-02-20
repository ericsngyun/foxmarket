"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextHandler = exports.nextApp = void 0;
// Import the Next.js server module
var next_1 = __importDefault(require("next"));
// Set the PORT constant to the value of the PORT environment variable, or 3000 if the environment variable is not set
var PORT = Number(process.env.PORT) || 3000;
// Initialize a Next.js application with the dev option set based on the NODE_ENV environment variable and the port option set to the PORT constant
exports.nextApp = (0, next_1.default)({
    dev: process.env.NODE_ENV !== "production",
    port: PORT,
});
// Get the request handler function from the Next.js application and export it
exports.nextHandler = exports.nextApp.getRequestHandler();
