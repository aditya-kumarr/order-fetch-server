const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());




app.use((req, res) => {
  res.end();
});
app.listen(PORT, () => console.log(`Apis on port ${PORT}!`));
