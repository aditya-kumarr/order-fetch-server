require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { findUser, findOrders } = require("./db");
const InitialiseDB = require("./InitialiseDB");

const app = express();
// setting up port for the express server
const PORT = 3000 || process.env.PORT;

// allowing cors because I'm deploying the client as a static site on github pages
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// api route for fetching users along with their orders by passing firstName
app.post("/api/users", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.name === "") res.json([]);
    console.log(req.body);
    const users = await findUser(req.body.name);
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});
// api route for fetching orders by date
app.post("/api/orders", async (req, res) => {
  try {
    console.log(req.body.date);
    const orders = await findOrders(req.body.date);
    console.log(orders);
    console.log(req.body.date);
    res.json(orders);
  } catch (error) {
    console.log(error.message);
  }
});
app.use(express.json());

// This function is supposed to initialise the given users in the assignment; I've called it once to add them to database.
// InitialiseDB();

app.use((req, res) => {
  res.end();
});
app.listen(PORT, () => console.log(`Apis on port ${PORT}!`));
