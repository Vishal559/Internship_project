const express = require("express");
const router = express.Router();


const {
    addProduct,
    getAllProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct,
  
} = require("../controllers/productController");


router.route("/products").get(getAllProduct);

router.route("/product/add").post(addProduct);
router
  .route("/product/:id")
  .get(getOneProduct)
  .put(updateOneProduct)
  .delete(deleteOneProduct);




module.exports = router;