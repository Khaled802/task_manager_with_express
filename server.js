const express = require('express');
const taskRouter = require('./routers/tasks');
const connectDB =require("./db/connect");
const bodyParser = require('body-parser');
const { notFoundPath } = require('./middleware/notFound')
const { handleError } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config("");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.json());

app.use(express.static('./public'));



app.use('/api/v1/tasks', taskRouter);

app.use(notFoundPath);
app.use(handleError);


const start = ()=> {
    connectDB(process.env.MONGODB_STR)
    .then(()=>{
        app.listen(PORT, console.log(`server start at port[${PORT}]`));
    })
    .catch(err=>{
        console.error(`there is an error ${err}`);
    });
}

start();