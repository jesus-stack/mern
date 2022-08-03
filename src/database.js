const { url } = require('inspector');
const mongoose = require('mongoose');

const URI = 'mongodb+srv://jisus:123@cluster0.c0xwy.mongodb.net/giftsretryWrites=true&w=majority';

mongoose.connect(URI)
.then(db => console.log('DB is connected'))
.catch(err => console.err(err));

module.exports = mongoose;