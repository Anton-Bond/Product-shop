"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = require("../models/user");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};
exports.jwt = (passport) => {
    passport.use(new JwtStrategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(payload.userId).select('email _id');
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    })));
};
//# sourceMappingURL=passport.js.map