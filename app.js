require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./db/connect');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const passport = require('passport');
const userRoute = require('./routes/UserRoutes');
const adminRoute = require('./routes/AdminRoutes');
// const dbUrl = 'mongodb://127.0.0.1:27017/finmart'; //FOR DEVELOPMENT MODE
const dbUrl = process.env.DBURL; //FOR PRODUCTION MODE

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const secret = process.env.SECRET;
// const secret = 'finmart';
app.use(
  session({
    secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      dbName: 'finmart',
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);

app.use('/', userRoute);
app.use('/admin', adminRoute);
app.get('/loan', (req, res) => {
  const { loandetails, loanamount, loantime } = req.query; // Get values from query parameters
  
  // Render 'loan' page with received data
  res.render('loan', { loandetails, loanamount, loantime });
});

app.use('*', (req, res) => {
  res.render('error');
});

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDb(dbUrl);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
