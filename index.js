const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dataFile = path.join(__dirname, "data.json");

const readData = () =>
  new Promise((resolve, reject) => {
    fs.readFile(dataFile, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

const writeData = (data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

app.get("/", async (req, res) => {
  res.json({ status: 200 });
});

app.get("/items", async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const data = await readData();
    const newItem = { id: Date.now(), value: req.body.title };
    data.push(newItem);
    await writeData(data);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const data = await readData();
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = data.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    data[itemIndex] = { ...data[itemIndex], value: req.body.title };
    await writeData(data);
    res.json(data[itemIndex]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/items/:id", async (req, res) => {
  const data = await readData();
  const itemId = parseInt(req.params.id, 10);
  let removedItem = {};
  const newData = data.filter(item => {
    if (item.id !== itemId) {
      return true;
    }
    removedItem = { ...item };
    return false;
  });
  if (data.length === newData.length) {
    return res.status(404).json({ error: "Item not found" });
  }
  await writeData(newData);
  res.json(removedItem);
});

const PORT = 3000;
app.listen(PORT, () => {
  {
    console.log(`Server is running on port ${PORT}`);
  }
});
