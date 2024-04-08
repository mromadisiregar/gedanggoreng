const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = "${{TOKEN}}";
console.log("---")
console.log("${{TOKEN}}");
console.log("${{shared.TOKEN}}");
console.log("---");
const bot = new TelegramBot(token, { polling: true });
const chatId = "${{CHATID}}";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

router.post('/bot_notifikasi_cpanel', async (req, res) => {
  try {
    const formData = req.body;
    const receivedKey = formData.validation_key;
    const validationKey = "${{VALIDATIONKEY}}";
    if (receivedKey !== validationKey) {
      res.status(403).send('Invalid validation key');
      return;
    }
    console.log('Received form data:', formData);
    const message = JSON.stringify(formData);

    await bot.sendMessage(chatId, message);

    console.log('Message sent successfully');
    res.send('Data received and sent successfully');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Error handling request');
  }
});

app.use(router);

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
