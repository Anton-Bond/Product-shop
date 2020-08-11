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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.removeById = exports.removeProd = exports.getByUserId = void 0;
const cart_1 = require("../models/cart");
const order_1 = require("../models/order");
exports.getByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_1.Cart.findOne({ userId: req.params.id })
            .select('list')
            .populate('list.productId', 'prodCode name price');
        res.status(200).json(cart.list);
    }
    catch (e) {
        res.status(200).json(null);
    }
});
// delete one count of product from user cart by id
const deleteProductFromCart = (userId, prodId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield cart_1.Cart.findOne({ userId });
    const list = userCart.list;
    const idx = list.findIndex(item => item.productId.toString() === prodId);
    const product = list[idx];
    // change product count
    if (list[idx].count > 1) {
        // decrease count of product
        list[idx].count--;
    }
    else {
        // delete if count === 1
        list.splice(idx, 1);
    }
    // update cart list of user
    yield cart_1.Cart.findByIdAndUpdate(userCart._id, { list });
    // return product to app for response
    return product;
});
// delete product from cart by id from cart page
exports.removeProd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId.toString();
        const prodId = req.query.prodId.toString();
        const product = yield deleteProductFromCart(userId, prodId);
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.removeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_1.Cart.deleteOne({ userId: req.params.id });
        res.status(200);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
// add user order to DB
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get last number of order
        const lastOrder = yield order_1.Order
            .findOne({ user: req.body.id })
            .sort({ date: -1 });
        const maxOrder = lastOrder ? lastOrder.orderNum : 0;
        const order = yield new order_1.Order({
            list: req.body.list,
            userId: req.body.userId,
            orderNum: maxOrder + 1
        }).save();
        res.status(201).json(order);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
//# sourceMappingURL=cart.js.map