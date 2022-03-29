const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDb = () => {
  mongoose
    .connect('mongodb+srv://admin-vishal:Vishal123490@cluster0.cujjf.mongodb.net/ZOMATO_DB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("CONNECTED WITH DATABASE"))
    .catch((error) => {
      console.log("DATABASE CONNECTION ISSUES");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDb;