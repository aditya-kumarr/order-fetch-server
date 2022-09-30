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


