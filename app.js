// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create an instance of Express
const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define a schema for DevOps tools data
const devOpsToolSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String
});

// Create a model for DevOps tools data
const DevOpsTool = mongoose.model('DevOpsTool', devOpsToolSchema);

// Define a route to fetch DevOps tools data
app.get('/devops/tools', async (req, res) => {
  try {
    // Query the database for DevOps tools
    const tools = await DevOpsTool.find();
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Express server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
