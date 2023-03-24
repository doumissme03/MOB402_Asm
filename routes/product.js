const express = require("express");

const router = express.Router();

const data = require('../utils/data');
const products = data.products;

// #READ
router.get("/list", (req, res, next) => {
  res.render("product", {
    pageTitle: "List Product",
    isAccess: true,
    productActive: true,
    products: products,
  });
});

router.get("/read/:_id", (req, res, next) => {

  const product = products.find((x) => {
    return x._id === req.params._id;
  });

  res.render("product_read", {
    pageTitle: "Read Product",
    isAccess: true,
    productActive: true,
    product: product,
  });
});

// #CREATE
router.get('/create',(req,res,next)=>{
  res.render("product_create", {
    pageTitle: "Add new Product",
    isAccess: true,
    productActive: true,
  });
})

router.post("/create", (req, res, next) => {
  const newProduct = {
    _id: `u${Date.now()}`,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    count: req.body.count,
    color: req.body.color,
    category: req.body.category,
  };

  products.push(newProduct);
  console.log("products", products.length);

  // res.render("product_create", {
  //   pageTitle: "Add new Product",
  //   productActive: true,
  //   isAccess: true,
  //   products: products,
  //   notify:'Add success'
  // });
  res.redirect("/products/list");

});

// #UPDATE
router.get("/update/:_id", (req, res, next) => {

  const product = products.find((x) => {
    return x._id === req.params._id;
  });
  console.log('product',product)
  console.log("product.name", product.name);

  res.render("product_update", {
    pageTitle: "Update Product",
    isAccess: true,
    productActive: true,
    product: product,
  });

});

router.post("/update/:_id", (req, res, next) => {

  const productIndex = products.findIndex((obj) => obj._id == req.params._id);
  const product = products.find((x) => {
    return x._id === req.params._id
  })

  products[productIndex].name = req.body.name;
  products[productIndex].price = req.body.price;
  products[productIndex].img = req.body.img;
  products[productIndex].count = req.body.count;
  products[productIndex].color = req.body.color;
  products[productIndex].category = req.body.category;

  // res.render("product_update", {
  //   pageTitle: "Update Product",
  //   productActive: true,
  //   isAccess: true,
  //   product: product,
  //   notify:"Update success"
  // });
  res.redirect('/products/list')

});

// #DELETE
router.get('/delete/:_id',(req,res,next)=>{

  const product = products.find((x) => {
    return x._id === req.params._id;
  });
  const productIndex = products.indexOf(product);

  if(productIndex > -1){
    products.splice(productIndex,1);
  }

  res.redirect('/products/list');

})



exports.router = router;
