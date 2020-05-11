const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// config file data base
const db = require('./config/db');
const indexRoutes = require('./routes/index');
const cartRoutes = require('./routes/cart');

const app = express();
// use jade engine
app.set('view engine', 'jade');
// folder of tamplates
app.set('views', path.join(__dirname, 'views'));
// looks additional files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// routes
app.use('/', indexRoutes);
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
