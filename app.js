const express = require("express");
require("dotenv").config();
const app = express();
const connectWithDb = require("./config/db");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

connectWithDb();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
);

//import All routes
const product = require("./routes/product");

//router middleware
app.use("/api/v1", product);

const port = process.env.PORT || 8080;

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${port}`);
})