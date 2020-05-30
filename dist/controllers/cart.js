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
exports.remove = exports.getAll = void 0;
const cart_1 = require("../models/cart");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_1.Cart.find()
            .populate('productId', 'prodCode name price');
        res.status(200).json(cart);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
// delete one count of product from cart by id
const deleteProductFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield cart_1.Cart.findById(id).populate('productId', 'name');
    ;
    if (product.count > 1) {
        // update count if more than one
        yield cart_1.Cart.findByIdAndUpdate(product._id, { count: --product.count });
    }
    else {
        // delete if count === 1
        yield cart_1.Cart.findByIdAndDelete(id);
    }
    return product;
});
// delete product from cart by id from cart page
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield deleteProductFromCart(req.params.id);
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
//# sourceMappingURL=cart.js.map