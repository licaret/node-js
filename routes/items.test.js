const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const router = require("./items");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Create new item", () => {
  beforeAll(async () => {
    const connectionString =
      "mongodb+srv://licaretraul:pass@goit.leqjsp1.mongodb.net/?retryWrites=true&w=majority&appName=GoIT";
    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected..."))
      .catch((err) => console.log(err));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create new item successfully", async () => {
    const newItem = {
      name: "Test Item",
      price: 1000,
    };

    const response = await request(app).post("/").send(newItem).expect(201);
    expect(response.status).toBe(201);
  });

  it("should return 400 for invalid data ", async () => {
    const invalidItem = {
      name: "Te",
      price: 1000,
    };

    const response = await request(app).post("/").send(invalidItem).expect(400);
    expect(response.body.error).toBe(
      '"name" length must be at least 3 characters long'
    );
  });
});
