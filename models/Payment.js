const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

user_email: {
    type: String,
    required: true,
    lowercase: true,
},

price:{
    type: Number,
    required: true,
},

reference:{
    type: String,
    required: true,
},

course:{
    type: String,
    required: true,
}
});

module.exports = mongoose.model('Payment',paymentSchema);

