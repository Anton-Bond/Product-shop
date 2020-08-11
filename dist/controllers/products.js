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
exports.removeById = exports.update = exports.addNewProduct = exports.getById = exports.getAll = void 0;
const product_1 = require("../models/product");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        res.status(200).json(products);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.Product({
            prodCode: req.body.prodCode,
            name: req.body.name,
            price: req.body.price
        });
        yield product.save();
        res.status(201).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.Product({
            prodCode: req.body.prodCode,
            name: req.body.name,
            price: req.body.price
        });
        yield product_1.Product.findByIdAndUpdate(req.params.id, {
            prodCode: req.body.prodCode,
            name: req.body.name,
            price: req.body.price
        });
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.removeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findByIdAndRemove(req.params.id);
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
//# sourceMappingURL=products.js.map