import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    "date":{type: String},
    "reference": {type: String, required:true, index: true},
    "amount": {type: String},
    "retailer": {type: String},
    "processDate": {type: String},
    "sortDate": {type: String},
    "paid": {type: Boolean},
    "paidDate" : {type: Date}
},{ timestamps: true })

// mongoose will pluralise the collection
export default mongoose.model('transaction', schema)