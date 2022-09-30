const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderID: Number,
  amount: Number,
  date: {
    type: String,
    default: () => Date.now(),
  },
});

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

userSchema.methods.setOrder = async function (Order, data) {
  const order = await Order.create({ ...data });
  this.orders.push(order._id);
  await this.save();
  console.log("offer set");
};

module.exports = {
  User: model("User", userSchema),
  Order: model("Order", orderSchema),
};
