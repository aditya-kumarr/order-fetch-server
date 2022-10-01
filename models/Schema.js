const { Schema, model } = require("mongoose");


// Schema for the Orders
const orderSchema = new Schema({
  orderID: Number,
  amount: Number,
  date: {
    type: String,
    default: () => Date.now(),
  },
});
// Schema for the Users collection
const userSchema = new Schema({
  customerId: Number,
  firstName: String,
  lastName: String,
  orders: [
    {
      type: Schema.ObjectId,
      ref: "Order",
    },
  ],
});
// Adding a method to the user document such that it'll create a document in the orders collection and add append it's _id to the user's 'orders' array.
userSchema.methods.setOrder = async function (Order, data) {
  const order = await Order.create({ ...data });
  this.orders.push(order._id);
  await this.save();
};

module.exports = {
  User: model("User", userSchema),
  Order: model("Order", orderSchema),
};
