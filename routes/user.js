const express = require('express');

const router = express.Router();

const data = require('../utils/data');
const users = data.users;


router.get('/list',(req,res,next)=>{
    res.render('user',{
        pageTitle:'List User',
        userActive:true,
        isAccess:true,
        users:users
    })
})

// #INSERT
router.get('/insert',(req,res,next)=>{
    res.render("user_insert", {
      pageTitle: "Add new User",
      userActive: true,
      isAccess: true,
    });
});

router.post("/insert", (req, res, next) => {
  //      check available
  console.log("users", users.length);
  for (let i = 0; i < users.length; i++) {
    if (users.at(i).email == req.body.email) {
      console.log("email available");
      return res.render("user_insert", {
        pageTitle: "Add new User",
        userActive: true,
        isAccess: true,
        notify: "Fail! Email available",
      });
    }
  }

  const newUser = {
    _id: `u${Date.now()}`,
    fullName: req.body.full_name,
    email: req.body.email,
    avatar: req.body.avatar,
    phoneNumber: req.body.phone_number,
    address: req.body.address,
    order: req.body.order,
  };

  users.push(newUser);
  console.log("users", users.length);

  res.render("user_insert", {
    pageTitle: "Add new User",
    userActive: true,
    isAccess: true,
    notify: "Add success",
  });
});
exports.router = router;