import mongoose from "mongoose"

// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://admin-ritushree:Mo4gS9UnLrFY1J0Y@cluster0.s6k4ce2.mongodb.net/Nodemailer";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  reminderDateTime: { type: Date, required: true },
  billName: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Reminder = mongoose.model('ReminderSchema', reminderSchema);

module.exports= async (req, res) => {
  if (req.method === 'POST') {
    const { email, reminderDateTime, billName,amount } = req.body;
    try {
      const reminder = new Reminder({ email, reminderDateTime, billName,amount } );
      await reminder.save();
      return res.status(200).json({ msg: 'Reminder saved successfully' });
    } catch (error) {
      console.error('Error saving reminder:', error);
      return res.status(500).json({ error: 'Failed to save the reminder' });
    }
  } 
    // res.status(200).json({ msg: 'hello' });
};