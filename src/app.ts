import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import { cartRoutes } from './routes/cart.router';
import { productsRoutes } from './routes/products.router';
import db from './config/db';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use( "/products", productsRoutes);
app.use( "/cart", cartRoutes);

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
const start = async () => {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    app.listen(3000, () => {
    // tslint:disable-next-line:no-console
      console.log('Server is running on port 3000');
    });
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

start();
