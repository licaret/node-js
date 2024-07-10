const path = require("path");
const fs = require("fs");

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

module.exports = { readData, writeData };
