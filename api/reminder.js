const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// Replace with your actual MongoDB URI
const dbUri = "mongodb://arpande:zmxncbv%40123@ac-dhs1i5d-shard-00-00.nhcw4dm.mongodb.net:27017,ac-dhs1i5d-shard-00-01.nhcw4dm.mongodb.net:27017,ac-dhs1i5d-shard-00-02.nhcw4dm.mongodb.net:27017/Reminder?ssl=true&replicaSet=atlas-tzfa6f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const reminderSchema = new mongoose.Schema({
    email: String,
    reminderDateTime: Date,
    billName: String,
    amount:Number
  });
  const Reminder = mongoose.model('ReminderSchema', reminderSchema);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ritushreedas20027@gmail.com", // Your email
      pass: "xlaj nsvr poit yxtq", // Your email password
    },
  });

  module.exports = async (req, res) => {
    const now = new Date(new Date().toISOString());
    try {
      // const reminders = await Reminder.find({ reminderDateTime: { $lte: now } });
      // if (reminders.length > 0) {
      //   // Map each reminder to a promise of sending an email and deleting the reminder
      //   const operations = reminders.map(reminder => 
      //     (async () => {
      //       const mailOptions = {
      //         from: "ritushreedas20027@gmail.com",
      //         to: reminder.email,
      //         subject: 'FinanceFolio',
      //         text: `Hi there! Just a reminder that your ${reminder.billName} bill of amount ${reminder.amount} is due as on ${reminder.reminderDateTime}.`,
      //       };
      //       await transporter.sendMail(mailOptions);
      //       console.log(`Email sent to ${reminder.email}`);
      //       await Reminder.findByIdAndDelete(reminder._id);
      //       console.log(`Reminder with ID ${reminder._id} deleted from the database.`);
      //     })()
      //   );
        
      //   // Wait for all operations to complete
      //   await Promise.all(operations);
      //   return res.status(200).json({ msg: 'Reminders processed successfully' });
      // } else {
      //   console.log('No reminders match the current date and time.');
      //   return res.status(200).json({ msg: 'No reminders to process' });
      // }
      return res.status(200).json({ msg: "hi hello" });
    } catch (error) {
      console.error('Error processing reminders:', error);
      return res.status(500).json({ error: 'Failed to process reminders' });
    }
  }