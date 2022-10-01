const mongoose = require("mongoose");
const { User, Order } = require("./models/Schema");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const findUser = async (firstName) => {
  const query = new RegExp(firstName);
  try {
    const myuser = await User.where("firstName").equals(query).populate({
      path: "orders",
    });
    return myuser;
  } catch (e) {
    console.warn(e.message);
  }
};
const findOrders = async (date) => {
  const query = new RegExp(date);
  try {
    const orders = await Order.find({ date: query });
    return orders;
  } catch (error) {
    console.warn(error);
  }
};
module.exports = {
  findUser: findUser,
  findOrders: findOrders,
};
