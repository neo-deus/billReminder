const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://arpande:zmxncbv%40123@cluster0.nhcw4dm.mongodb.net/Reminder?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  email: String,
  reminderDateTime: Date,
  billName: String,
  amount:Number
});
const Reminder = mongoose.model('ReminderSchema', reminderSchema);

module.exports= async (req, res) => {
  if (req.method === 'POST') {
    const { email, reminderDateTime, billName,amount } = req.body;
    try {
      const reminder = new Reminder({ email, reminderDateTime, billName,amount });
      await reminder.save();
      return res.status(200).json({ msg: 'Reminder saved successfully' });
    } catch (error) {
      console.error('Error saving reminder:', error);
      return res.status(500).json({ error: 'Failed to save the reminder' });
    }
  } 
    // res.status(200).json({ msg: 'hello' });
};