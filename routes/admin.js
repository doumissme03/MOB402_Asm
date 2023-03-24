const express = require("express");

const router = express.Router();

const data = require("../utils/data");
const admins = data.admins;

// #SIGN IN
router.get("/sign_in", (req, res, next) => {
  res.render("sign_in", {
    pageTitle: "Sign in",
    signInActive: true,
  });
});

router.post("/sign_in", (req, res, next) => {
  //      check account
  console.log("admins", admins);
  let isAccess = false;

  for (let i = 0; i < admins.length; i++) {
    if (
      admins.at(i).email == req.body.email &&
      admins.at(i).password == req.body.password
    ) {
      isAccess = true;
      break;
    }
  }

  //      render
  if (isAccess) {
    return res.redirect('/users/list');
  } else {
    return res.render("sign_in", {
      pageTitle: "Sign in",
      signInActive: true,
      notify: "Fail! Check your email or password",
    });
  }
});

// #SIGN UP
router.get("/sign_up", (req, res, next) => {
  res.render("sign_up", {
    pageTitle: "Sign up",
    signUpActive:true
  });
});

router.post("/sign_up", (req, res, next) => {
  //      check available
  console.log("admins", admins);

  for (let i = 0; i < admins.length; i++) {
    if (admins.at(i).email == req.body.email) {
        console.log('email available')
      return res.render("sign_up", {
        pageTitle: "Sign up",
        signUpActive: true,
        notify:'Fail! Email available'
      });
    }
  }

  //      new account admin
  console.log('req.body',req.body);
  const newAdmin = {
    _id: 'ad'+Date.now(),
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.full_name,
    avatar: req.body.avatar,
  };
  admins.push(
    newAdmin
  );
  console.log("admins", admins);

  // res.render("sign_up", {
  //   pageTitle: "Sign up",
  //   signUpActive:true,
  //   notify: "Success! Comeback to Sign In",
  // });
  res.redirect('/admins/sign_in')
});

exports.router = router;
