const mongoose = require("mongoose");
const { User, Order } = require("./models/Schema");
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(
  "mongodb://localhost:27017/testdb",
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

const user1 = new User({
  customerId: 1234,
  firstName: "ramesh",
  lastName: "malhotra",
  order: [],
});
const user2 = new User({
  customerId: 1235,
  firstName: "john",
  lastName: "doe",
  order: [],
});
const user3 = new User({
  customerId: 1236,
  firstName: "mohd",
  lastName: "islam",
  order: [],
});

// Saving the users, I know that there are better ways of doing this but since we're not getting more data I find it ok.
user1
  .save()
  .then(async () => {
    await user1.setOrder(Order, {
      orderID: 880,
      amount: 379,
      date: "2020-07-25T14:10:26.113Z",
    });
    await user1.setOrder(Order, {
      orderID: 881,
      amount: 479,
      date: "2020-08-25T14:10:26.113Z",
    });
    await user1.setOrder(Order, {
      orderID: 882,
      amount: 579,
      date: "2020-09-25T14:10:26.113Z",
    });
  })
  .catch((e) => console.warn(e));
user2
  .save()
  .then(async () => {
    await user2.setOrder(Order, {
      orderID: 883,
      amount: 379,
      date: "2020-07-25T14:10:26.113Z",
    });
    await user2.setOrder(Order, {
      orderID: 884,
      amount: 479,
      date: "2020-08-25T14:10:26.113Z",
    });
  })
  .catch((e) => console.warn(e));
user3
  .save()
  .then(async () => {
    await user3.setOrder(Order, {
      orderID: 886,
      amount: 379,
      date: "2020-07-25T14:10:26.113Z",
    });
    await user3.setOrder(Order, {
      orderID: 887,
      amount: 479,
      date: "2020-08-25T14:10:26.113Z",
    });
    await user3.setOrder(Order, {
      orderID: 888,
      amount: 579,
      date: "2020-09-25T14:10:26.113Z",
    });
    await user3.setOrder(Order, {
      orderID: 889,
      amount: 579,
      date: "2020-10-25T14:10:26.113Z",
    });
  })
  .catch((e) => console.warn(e));

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