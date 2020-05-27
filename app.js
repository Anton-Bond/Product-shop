const express = require('express');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const bodyParser = require('body-parser');
// config file data base
const db = require('./config/db');
<<<<<<< HEAD
=======
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const bodyParser = require('body-parser');
>>>>>>> e11d0af92ba68da4f6fcf8a24b406c1effc7eeee

const app = express();  

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

// routes
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Страница не найдена'
  });
});


async function start() {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
