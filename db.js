const mongoose = require("mongoose");
const { User, Order } = require("./models/Schema");
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
// const DBURL =
//   "mongodb://aditya:GrYE087jWb3HVYY7@ac-x8tgegp-shard-00-00.iyzhljl.mongodb.net:27017,ac-x8tgegp-shard-00-01.iyzhljl.mongodb.net:27017,ac-x8tgegp-shard-00-02.iyzhljl.mongodb.net:27017/user-orders?ssl=true&replicaSet=atlas-dj4iwi-shard-0&authSource=admin&retryWrites=true&w=majority";

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
