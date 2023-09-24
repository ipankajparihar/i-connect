const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/i_connect");
}

//connection to db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

//when running
db.once("open", function () {
  console.log("Successfully connected to database");
});
