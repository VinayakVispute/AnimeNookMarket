// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/db");
require("dotenv").config(); // Load environment variables from .env file

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Set the port for the server

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define a simple route to check if the server is connected
app.get("/", (req, res) => {
  res.send("Connected");
});

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
