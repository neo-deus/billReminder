const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://admin-ritushree:Mo4gS9UnLrFY1J0Y@cluster0.s6k4ce2.mongodb.net/Nodemailer";

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

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Ensure the request body is parsed
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const { email, reminderDateTime, billName, amount } = req.body;

    // Validate input data
    if (!email || !reminderDateTime || !billName || amount === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const reminder = new Reminder({ email, reminderDateTime, billName, amount });
      await reminder.save();
      return res.status(200).json({ msg: 'Reminder saved successfully' });
    } catch (error) {
      console.error('Error saving reminder:', error);
      return res.status(500).json({ error: 'Failed to save the reminder' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
