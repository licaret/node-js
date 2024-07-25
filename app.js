const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const itemsRouter = require("./routes/items");
const authRouter = require("./routes/auth");
const passport = require("passport");

require("dotenv").config();

const connectionString =
  "mongodb+srv://licaretraul:pass@goit.leqjsp1.mongodb.net/?retryWrites=true&w=majority&appName=GoIT";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require("./config/passport")(passport);
app.use(passport.initialize());

app.use("/items", itemsRouter);
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  res.json({ status: 200 });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "error",
    code: err.status || 500,
    message: err.message,
    data: err.data || "Internal Server Error",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  {
    console.log(`Server is running on port ${PORT}`);
  }
});
