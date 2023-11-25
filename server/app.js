// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/db");
const fileUpload = require("express-fileupload");
const cloudinary = require("./connection/cloudinary");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config(); // Load environment variables from .env file

// Import routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
//End of Import of Routes

// Create an Express application
const app = express();
const port = process.env.PORT || 8000; // Set the port for the server

// Enable CORS for all routes
app.use(morgan("combined"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Define a simple route to check if the server is connected
app.get("/", (req, res) => {
  res.send("Connected");
});

//Routes

app.use("/products", productRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);

cloudinary.cloudinaryConnect();

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
