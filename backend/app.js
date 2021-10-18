const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*',cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err);
})

//Server
app.listen(3000,() => {
    console.log('Server is running http://localhost:3000');
})