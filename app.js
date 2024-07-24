const express = require("express");
const cors = require('cors');

const app = express();
const itemsRouter = require("./routes/items");
const mongoose = require("mongoose");

const connectionString = 'mongodb+srv://licaretraul:pass@goit.leqjsp1.mongodb.net/?retryWrites=true&w=majority&appName=GoIT';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/items", itemsRouter);

app.get("/", async (req, res) => {
  res.json({ status: 200 });
});

const PORT = 3000;
app.listen(PORT, () => {
  {
    console.log(`Server is running on port ${PORT}`);
  }
});
