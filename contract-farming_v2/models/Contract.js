const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false, // Make buyer optional
  },
  crop: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
  negotiation: {
    type: String,
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Contract", ContractSchema);
