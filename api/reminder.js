const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// Replace with your actual MongoDB URI
const dbUri = "mongodb+srv://admin-ritushree:Mo4gS9UnLrFY1J0Y@cluster0.s6k4ce2.mongodb.net/FINANCE";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const reminderSchema = new mongoose.Schema({
    email: String,
    reminderDateTime: Date,
    actualDueDate:Date,
    billName: String,
    amount:Number
  });
  const Reminder = mongoose.model('Reminder', reminderSchema);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ritushreedas20027@gmail.com", // Your email
      pass: "xlaj nsvr poit yxtq", // Your email password
    },
  });

  module.exports = async (req, res) => {

    const headers = {
      'Access-Control-Allow-Origin': '*',  // allows access from any domain
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

    if(req.method === 'GET'){

  
    const now = new Date(new Date().toISOString());
    try {
      const reminders = await Reminder.find({ reminderDateTime: { $gte: now } });
      if (reminders.length > 0) {
        // Map each reminder to a promise of sending an email and deleting the reminder
        const operations = reminders.map(reminder => 
          (async () => {
            const mailOptions = {
              from: "ritushreedas20027@gmail.com",
              to: reminder.email,
              subject: 'FinanceFolio',
              text: `Hi there! Just a reminder that your ${reminder.billName} bill of amount ${reminder.amount} is due as on ${reminder.actualDueDate}.`,
            };
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${reminder.email}`);
            await Reminder.findByIdAndDelete(reminder._id);
            console.log(`Reminder with ID ${reminder._id} deleted from the database.`);
          })()
        );
        
        // Wait for all operations to complete
        await Promise.all(operations);
        return res.status(200).json({ msg: 'Reminders processed successfully',headers });
      } else {
        console.log('No reminders match the current date and time.');
        return res.status(200).json({ msg: 'No reminders to process' });
      }
      // return res.status(200).json({ msg: "hi hello" });
    } catch (error) {
      console.error('Error processing reminders:', error);
      return res.status(500).json({ error: 'Failed to process reminders' });
    }
  }else{

    const { email, reminderDateTime,actualDueDate, billName, amount } = req.body;

    try {
      const reminder = new Reminder({ email, reminderDateTime,actualDueDate, billName,amount } );
      await reminder.save();
      return res.send({ msg: 'Reminder saved successfully',headers} );
    } catch (error) {
      console.error('Error saving reminder:', error);
      return res.status(500).json({ error: 'Failed to save the reminder' });
    }
  }
}