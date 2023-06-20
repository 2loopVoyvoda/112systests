const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://admin:admin@sys112.dzkfyc4.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create a schema for the bed availability data
const bedAvailabilitySchema = new mongoose.Schema({
  hospital: String,
  availability: String
});

// Create a model based on the schema
const BedAvailability = mongoose.model('BedAvailability', bedAvailabilitySchema);

// Retrieve bed availability data
app.get('/api/bed-availability', async (req, res) => {
  try {
    const bedAvailabilityData = await BedAvailability.find();
    res.json(bedAvailabilityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update bed availability data
app.put('/api/bed-availability/:id', async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const updatedBedAvailability = await BedAvailability.findByIdAndUpdate(id, { availability }, { new: true });
    res.json(updatedBedAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
