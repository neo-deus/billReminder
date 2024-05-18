const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://arpande:zmxncbv%40123@cluster0.nhcw4dm.mongodb.net/Reminder?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  reminderDateTime: { type: Date, required: true },
  billName: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Middleware to parse JSON
app.use(express.json());

app.post('/reminder', async (req, res) => {
  const { email, reminderDateTime, billName, amount } = req.body;

  // Validate input data
  if (!email || !reminderDateTime || !billName || amount === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Parse reminderDateTime as a Date object
    const parsedReminderDateTime = new Date(reminderDateTime);
    const reminder = new Reminder({
      email,
      reminderDateTime: parsedReminderDateTime,
      billName,
      amount,
    });

    await reminder.save();
    return res.status(200).json({ msg: 'Reminder saved successfully' });
  } catch (error) {
    console.error('Error saving reminder:', error);
    return res.status(500).json({ error: 'Failed to save the reminder' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
