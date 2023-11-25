const User = require("../models/UsersModel");
const crypto = require("crypto");
const sanitizeUser = require("../utils/sanitizeUser");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY";

const signUp = async (req, res) => {
  console.log("req.body");
  try {
    const { email, password } = req.body;

    // Check if both email and password are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    //Hash the password
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password, // password
      salt, // random bytes
      310000 /* iterations */,
      64, // key length
      "sha256", // hash algorithm
      async (err, hashedPassword) => {
        try {
          // Create a new user
          const newUserdata = new User({
            email,
            password: hashedPassword,
            salt,
          });
          // Save the user to the database
          const newUser = await newUserdata.save();
          req.login(newUser, (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Internal Server Error!!",
                user: null,
              });
            } else {
              const token = jwt.sign(sanitizeUser(newUser), SECRET_KEY);
              console.log("registering user", sanitizeUser(newUser));
              return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: sanitizeUser(newUser),
              });
            }
          });
        } catch (err) {
          console.error("Error signing up user:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error!!" });
        }
      }
    );
  } catch (error) {
    console.error("Error signing up user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  return res.json({
    success: true,
    message: "User logged in successfully",
    user: sanitizeUser(req.user),
  });
};

const checkUser = async (req, res) => {
  const loggedUser = await req.user;
  if (!loggedUser) {
    return res.json({
      success: false,
      message: "User not logged in",
      user: null,
    });
  }
  return res.json({
    success: true,
    message: "User logged in successfully",
    user: sanitizeUser(loggedUser),
  });
};

module.exports = { login, checkUser, signUp };
