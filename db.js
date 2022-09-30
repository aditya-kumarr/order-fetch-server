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

