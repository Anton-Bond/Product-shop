"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    orderNum: Number,
    list: [
        {
            name: String,
            count: Number,
            price: Number
        }
    ],
    userId: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
});
exports.Order = mongoose_1.default.model('Order', orderSchema);
//# sourceMappingURL=order.js.map