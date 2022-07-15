const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database')
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/tasks',require('./routes/task.routes'));

//static file
app.use(express.static(path.join(__dirname,'public')));

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server listening on port ${app.get('port')}`);
});