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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passp = __importStar(require("./middleware/passport"));
const cart_router_1 = require("./routes/cart.router");
const products_router_1 = require("./routes/products.router");
const auth_router_1 = require("./routes/auth.router");
const orders_router_1 = require("./routes/orders.router");
const db_1 = __importDefault(require("./config/db"));
const app = express_1.default();
app.use(passport_1.default.initialize());
passp.jwt(passport_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/products', products_router_1.productsRoutes);
app.use('/cart', cart_router_1.cartRoutes);
app.use('/auth', auth_router_1.authRoutes);
app.use('/orders', orders_router_1.ordersRoutes);
// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', {
//     title: 'Страница не найдена'
//   });
// });
// async function start() {
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(db_1.default.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(3000, () => {
            // tslint:disable-next-line:no-console
            console.log('Server is running on port 3000');
        });
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});
start();
//# sourceMappingURL=app.js.map