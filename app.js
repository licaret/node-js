const express = require("express");

const app = express();
const itemsRouter = require("./routes/items");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
