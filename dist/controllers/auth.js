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
exports.registration = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield user_1.User.findOne({ email: req.body.email });
    if (candidate) {
        // check password, user is exist
        const passwordResult = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
        const isAdmin = req.body.email === 'admin@iba.gomel.by';
        if (passwordResult) {
            // generate token, passwords are match
            const token = jsonwebtoken_1.default.sign({
                email: candidate.email,
                userId: candidate._id,
                isAdmin
            }, 'secret', { expiresIn: 60 * 60 });
            res.status(200).json({
                token: `Bearer ${token}`
            });
        }
        else {
            // passwords aren't match
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            });
        }
    }
    else {
        // user isn't exist, send error
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        });
    }
});
exports.registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find user from DB by email
    const candidate = yield user_1.User.findOne({ email: req.body.email });
    if (candidate) {
        // user is exist, send error
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        });
    }
    else {
        // create new user
        const salt = bcryptjs_1.default.genSaltSync(10);
        const password = req.body.password;
        const user = new user_1.User({
            email: req.body.email,
            name: req.body.name,
            password: bcryptjs_1.default.hashSync(password, salt)
        });
        try {
            yield user.save();
            res.status(201).json(user);
        }
        catch (e) {
            res.status(404).send(e.message);
        }
    }
});
//# sourceMappingURL=auth.js.map