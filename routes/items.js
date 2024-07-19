const express = require("express");
const { readData, writeData } = require("../services/dataService");
const router = express.Router();
const Joi = require("joi");
const Item = require("../models/Items");

const itemsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(255).optional(),
  price: Joi.number().positive().required()
});

router.get("/", async (req, res) => {
  try {
    // const data = await readData();x
    const { priceMin = 0, priceMax = Math.min() } = req.query;
    const data = await Item.find({
      price:
        {
          $gte: priceMin,
          $lte: priceMax
        }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = itemsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    // const data = await readData();
    // const newItem = { id: Date.now(), ...req.body };
    // data.push(newItem);
    // await writeData(data);

    const newItem = new Item(req.body);
    await newItem.save();

    res.status(201).send();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = itemsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    // const data = await readData();
    // const itemId = parseInt(req.params.id, 10);
    // const itemIndex = data.findIndex(item => item.id === itemId);
    // if (itemIndex === -1) {
    //   return res.status(404).json({ error: "Item not found" });
    // }
    // data[itemIndex] = { ...data[itemIndex], ...req.body };
    // await writeData(data);

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  // const data = await readData();
  // const itemId = parseInt(req.params.id, 10);
  // let removedItem = {};
  // const newData = data.filter(item => {
  //   if (item.id !== itemId) {
  //     return true;
  //   }
  //   removedItem = { ...item };
  //   return false;
  // });
  // if (data.length === newData.length) {
  //   return res.status(404).json({ error: "Item not found" });
  // }
  // await writeData(newData);
  // res.json(removedItem);

  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  if (!deletedItem) {
    res.status(404).json({ error: "Item not found" });
  }
  res.json(deletedItem);
});

module.exports = router;
