import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    created: { type: Date },
    date: { type: Date },
    reference: { type: String, required: true, index: true },
    amount: { type: String },
    retailer: { type: String },
    processDate: { type: String },
    paid: { type: Boolean },
    paidDate: { type: Date }
  },
  { timestamps: true }
);

// mongoose will pluralise the collection
export default mongoose.model('transaction', schema);
