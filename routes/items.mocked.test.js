const express = require("express");
const request = require("supertest");
const router = require("./items");
const Item = require("../models/Items");

jest.mock("../models/Items");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Create new item (mocked)", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should create new item successfully", async () => {
    const newItem = {
      name: "Test Item",
      price: 1000,
    };

    Item.prototype.save.mockResolvedValue(newItem);

    const response = await request(app).post("/").send(newItem).expect(201);
    expect(response.status).toBe(201);
  });
});
