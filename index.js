var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const axios = require("axios")
const fs = require('fs');
const textFilePath = 'file.txt';
const telegramToken = '6873766343:AAErkuk9g_ea-IWXWYSXskVGVINDjR5iqhM';
const chatId = '6705390884';

// test push

const sendMessage = async (message) => {
  axios
		.post(
			`https://api.telegram.org/bot${telegramToken}/sendMessage`,
			{
				chat_id: chatId,
				text: message,
			}
		)
		.then((response) => {
			console.log("Message posted")
		})
		.catch((err) => {
			console.log("Error :", err)
		})
};

const readAndSendMessages = async () => {
  try {
    const content = fs.readFileSync(textFilePath, 'utf-8');
    const sentences = content.split('.'); // You may need to adjust this based on your file format

    for (const sentence of sentences) {
      if (sentence.trim() !== '') {
        await sendMessage(sentence.trim());
        // console.log(sentence.trim());
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      }
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

app.use(bodyParser.json()) // for parsing application/json
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.get("/", function(req, res) {
	readAndSendMessages();
})

// Finally, start our server
const port = process.env.PORT || 3000
app.listen(port, function() {
	console.log("Telegram app listening on port 3000!")
})
