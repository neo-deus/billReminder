import mongoose from "mongoose"

// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://admin-ritushree:Mo4gS9UnLrFY1J0Y@cluster0.s6k4ce2.mongodb.net/Nodemailer";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
};

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  reminderDateTime: { type: Date, required: true },
  billName: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', reminderSchema);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Ensure the request body is parsed
    const body = JSON.parse(req.body);

    const { email, reminderDateTime, billName, amount } = body;

    // Validate input data
    if (!email || !reminderDateTime || !billName || amount === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      await connectToDatabase();

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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
