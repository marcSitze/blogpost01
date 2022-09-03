const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config")

exports.getRegister = (req, res) => {
  res.render("register/register", {
    user: req.body,
    title: "Register",
    userAuth: null,
  });
};
exports.createUser = async (req, res) => {
  const errors = [];
  let user;

  // Get Form fields
  const { email, username, password } = req.body;

  // 1 Check form fields
  console.log("req.body:", req.body);
  if (!username) {
    errors.push({ msg: "Please enter the Username" });
  }
  if (!email) {
    errors.push({ msg: "Please enter the email" });
  }
  if (!password) {
    errors.push({ msg: "Please enter the Password" });
  }
  if (password && password.length <= 6) {
    errors.push({ msg: "Please enter a longer password" });
  }

  if (errors.length > 0) {
    return res.status(400).render("register/register", {
      user: req.body,
      title: "Register",
      userAuth: null,
      success: false,
      errors,
    });
  }

  try {
    // 2 Check if user already exists
    user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: "User already exists" });
      // this means this user exist
      return res.status(400).render("register/register", {
        user: req.body,
        title: "Register",
        userAuth: null,
        success: false,
        errors,
      });
    }

    // 3 Encrypt user password
    // generate the salt
    const salt = await bcrypt.genSalt(10);
    // use the salt to hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    //4 Save user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    //5 Send access token

    // res.status(201).json({
    //   success: true,
    //   user: newUser,
    // });
    res.redirect("/auth/login");
  } catch (err) {
    console.error("RegisterUser: ", err);
  }
};
exports.getLogin = (req, res) => {
  res.render("register/login", {
    user: req.body,
    title: "Login",
    userAuth: null,
  });
};
exports.login = async (req, res) => {
  // Get form fields
  const errors = [];
  const { email, password } = req.body;
  let user;
  // check form fields

  if (!email) {
    errors.push({ msg: "Please enter the email" });
  }
  if (!password) {
    errors.push({ msg: "Please enter the Password" });
  }
  try {
    // check if the user exists
    user = await User.findOne({ email });

    if (!user) {
      errors.push({ msg: "User doesn't exists" });
      // this means this user exist
      return res.status(400).render("register/login", {
        user: req.body,
        title: "Login",
        userAuth: null,
        success: false,
        errors,
      });
    }
    //check password match
    const isMatch = await bcrypt.compare(password, user.password);
    // if no match return error
    if (!isMatch) {
      errors.push({ msg: "Invalid Credidentials" });
      return res.status(400).render("register/login", {
        user: req.body,
        title: "Login",
        userAuth: null,
        success: false,
        errors,
      });
    }
    // generate access token || a cookie
    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await jwt.sign(payload,config.auth.jwtSecret , {
      expiresIn: 60 * 60 * 1000 * 24 * 7,
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
      httpOnly: true,
    });
    // return success
    // res.status(200).json({
    //   success: true,
    //   user,
    //   token,
    // });

    res.redirect('/')
  } catch (err) {
    console.error("Login: ", err);
  }
};
