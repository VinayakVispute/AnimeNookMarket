// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/db");
const fileUpload = require("express-fileupload");
const cloudinary = require("./connection/cloudinary");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const crypto = require("crypto"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWTs
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser = require("cookie-parser");
const ExtractCookie = require("./utils/extractCookie");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/UsersModel"); // Assuming you have a User model
require("dotenv").config(); // Load environment variables from .env file
// Create an Express application
const app = express();
const port = process.env.PORT || 8000; // Set the port for the server

// Parse incoming JSON requests
app.use(express.json());

// middleware for file uploads (express-fileupload)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: true, // Enable debugging for express-fileupload
  })
);

//Import Middlewares
const isAuthenticated = require("./middlewares/authentication");
const sanitizeUser = require("./utils/sanitizeUser");

// Enable CORS for all routes
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
// For Parsing cookies
app.use(cookieParser());

//For JWT Authentication
const SECRET_KEY = "SECRET_KEY";
const opts = {};
opts.jwtFromRequest = ExtractCookie;
opts.secretOrKey = SECRET_KEY;

// For Session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// For logging requests to the console (for development) using morgan middleware
app.use(morgan("dev"));

// Import routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const countryRoutes = require("./routes/countryRoutes");
const orderRoutes = require("./routes/orderRoutes");
// Define a simple route to check if the server is connected
app.get("/", (req, res) => {
  res.send("Connected");
});

// Passport Strategy for authentication

// Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log("Incorrect email.");
          return done(null, false, { message: "Incorrect email." });
        }

        const hashedPassword = await new Promise((resolve, reject) => {
          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            64,
            "sha256",
            (err, hashedPassword) => {
              if (err) reject(err);
              else resolve(hashedPassword);
            }
          );
        });

        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          console.log("Incorrect password.");
          return done(null, false, { message: "Incorrect password." });
        }

        const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
        return done(
          null,
          { id: user.id, role: user.role, token },
          {
            message: "Logged in successfully.",
          }
        );
      } catch (err) {
        return done(err, false, { message: "Internal Server Error" });
      }
    }
  )
);

// JWT Strategy

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      if (user) {
        return done(null, sanitizeUser(user), { message: "Logged in." });
      } else {
        return done(null, false, { message: "Not logged in." });
      }
    } catch (err) {
      return done(err, false, { message: "Internal Server Error" });
    }
  })
);

// Serialize user
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("serializeUser", sanitizeUser(user));
    cb(null, sanitizeUser(user));
  });
});

// Deserialize user
passport.deserializeUser(async function (user, cb) {
  process.nextTick(function () {
    console.log("deserializeUser", user);
    cb(null, user);
  });
});

// Configure cloudinary
cloudinary.cloudinaryConnect();

// Routes
app.use("/products", isAuthenticated(),productRoutes);
app.use("/brands", isAuthenticated(), brandRoutes);
app.use("/categories", isAuthenticated(), categoryRoutes);
app.use("/users", isAuthenticated(), userRoutes);
app.use("/cart", isAuthenticated(), cartRoutes);
app.use("/orders", isAuthenticated(), orderRoutes);
app.use("/countries", isAuthenticated(), countryRoutes);

app.use("/auth", authRoutes);

// Start the server and connect to the database
const start = async () => {
  try {
    // Connect to MongoDB using the provided URI
    await connectDB(process.env.MONGO_URI);

    // Log a message when the database connection is successful
    console.log("Connected to the database");

    // Start the server and listen on the specified port
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    // Log an error message if there's an issue connecting to the database
    console.error("Error connecting to the database:", error);
  }
};

// Call the start function to initiate the server
start();
