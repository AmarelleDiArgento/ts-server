"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static optenerToken(payload) {
        return jsonwebtoken_1.default.sign({ usuario: payload }, this.semilla, { expiresIn: this.duracion });
    }
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.semilla, (err, decoded) => {
                (err) ? reject() : resolve(decoded);
            });
        });
    }
}
exports.default = Token;
Token.semilla = 'pruebasdeToken';
Token.duracion = '1h';
