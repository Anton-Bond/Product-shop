"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const controller = __importStar(require("../controllers/products"));
exports.productsRoutes = express_1.default.Router();
exports.productsRoutes.get('/', passport_1.default.authenticate('jwt', { session: false }), controller.getAll);
exports.productsRoutes.get('/:id', passport_1.default.authenticate('jwt', { session: false }), controller.getById);
exports.productsRoutes.post('/', passport_1.default.authenticate('jwt', { session: false }), controller.addNewProduct);
exports.productsRoutes.post('/:id', passport_1.default.authenticate('jwt', { session: false }), controller.update);
exports.productsRoutes.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), controller.removeById);
//# sourceMappingURL=products.router.js.map