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
exports.removeById = exports.getById = exports.addById = exports.getAll = void 0;
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const cart_1 = require("../models/cart");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.Order.find()
            .populate('userId', 'email name');
        res.status(200).json(orders);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
// add to cart product's id and count it
const addToCart = (userId, productId, count) => __awaiter(void 0, void 0, void 0, function* () {
    // if cart exit product
    const user = yield cart_1.Cart.findOne({ userId });
    if (user) {
        // create new product list
        const list = user.list;
        const idx = list.findIndex(item => item.productId.toString() === productId);
        if (idx >= 0) {
            // increase count of product
            list[idx].count += count;
        }
        else {
            // if product isn't exist in user cart, add to cart
            list.push({
                count,
                productId
            });
        }
        yield cart_1.Cart.findByIdAndUpdate(user._id, { list });
    }
    else {
        // add new user cart, if he isn't exist before
        const cart = new cart_1.Cart({
            userId,
            list: [
                {
                    count,
                    productId
                }
            ]
        });
        yield cart.save();
    }
});
exports.addById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.find();
    const product = products.find(p => p._id.toString() === req.body.productId);
    if (product) {
        try {
            yield addToCart(req.body.userId, product._id.toString(), req.body.count);
            res.status(201).json(product);
            // tslint:disable-next-line:no-console
            console.log(`Продукт "${product.name}" добавлен в корзину`);
        }
        catch (e) {
            res.status(404).send(e.message);
        }
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(`Не найден продукт с таким кодом товара`);
        res.status(204).json({});
    }
});
exports.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.Order.findById(req.params.id)
            .populate('userId', 'email name');
        res.status(200).json(order);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.removeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.Order.findByIdAndRemove(req.params.id);
        res.status(200).json(order);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
//# sourceMappingURL=orders.js.map