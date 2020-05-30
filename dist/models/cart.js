"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const cartSchema = new mongoose_1.default.Schema({
    count: Number,
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});
exports.Cart = mongoose_1.default.model('Cart', cartSchema);
//# sourceMappingURL=cart.js.map