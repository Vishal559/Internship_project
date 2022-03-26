const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const WhereClause = require("../utils/WhereClause");


exports.addProduct = BigPromise(async (req, res, next) => {

  if(req.files){
    let result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "items", //folder name -> .env
      }
    );
    const photo = {
      'id': result['public_id'],
      'secure_url': result['secure_url']
    }

    req.body.photo = photo;
  }
  const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product,
  });
});

exports.getAllProduct = BigPromise(async (req, res, next) => {

  const resultPerPage = 6;
  const totalcountProduct = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
  .search()
  .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalcountProduct,
  });
});



exports.getOneProduct = BigPromise(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  res.status(200).json({
    success: true,
    product,
  });

});


exports.updateOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
      return next(new CustomError("No product found with this id", 401));
  }
  if (req.files) {
      //destroy the existing image
    const res = await cloudinary.v2.uploader.destroy(
      product.photo.id
    );

    let result = await cloudinary.v2.uploader.upload(
      req.files.photos[index].tempFilePath,
      {
        folder: "items", //folder name -> .env
      }
    );

    const photo = {
      'id': result['public_id'],
      'secure_url': result['secure_url']
    }

    req.body.photo = photo;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});



exports.deleteOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  //destroy the existing image

  if(product.photo != NULL){
    const res = await cloudinary.v2.uploader.destroy(product.photo.id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product was deleted !",
  });
});
