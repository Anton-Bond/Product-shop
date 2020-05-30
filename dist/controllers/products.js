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
exports.addById = exports.getAll = void 0;
const product_1 = require("../models/product");
const cart_1 = require("../models/cart");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        res.status(200).json(products);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
// add to cart product's id and count it
const addToCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // if cart exit product
    const product = yield cart_1.Cart.findOne({ productId: id });
    if (product) {
        // increase count
        yield cart_1.Cart.findByIdAndUpdate(product._id, { count: ++product.count });
    }
    else {
        // add new product to cart
        const cart = new cart_1.Cart({
            count: 1,
            productId: id
        });
        yield cart.save();
    }
});
exports.addById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.find();
    const product = products.find(p => p._id.toString() === req.body.id);
    if (product) {
        yield addToCart(product._id);
        res.status(201).json(product);
        // tslint:disable-next-line:no-console
        console.log(`Продукт "${product.name}" добавлен в корзину`);
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(`Не найден продукт с таким кодом товара`);
    }
});
//# sourceMappingURL=products.js.map