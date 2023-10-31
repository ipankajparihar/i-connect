const mongoose = require("mongoose");
const env = require("./environment");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
}

//connection to db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

//when running
db.once("open", function () {
  console.log("Successfully connected to database");
});

module.exports = db;
