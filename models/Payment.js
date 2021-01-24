const {mongoose} = require('mongoose');

const paymentSchema = new mongoose.Schema({

user_email: {
    type: String,
    required: true,
    lowercase: true,
},

email:{
    type: String,
    requred: true,
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

const Payment = mongoose.model('Payment',paymentSchema);
module.exports = {Donor}
