// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Drug Safety Engine API Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // 1234@Siddharth#
require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const safetyRoutes =
  require("./routes/safetyRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/safety",
  safetyRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Drug Safety Engine Running"
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

  console.log(
    "OPENROUTER KEY:",
    process.env.OPENROUTER_API_KEY
      ? "FOUND"
      : "MISSING"
  );
});