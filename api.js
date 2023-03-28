const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Define your encryption function
function myEncryptFunction(key, input_text) {
  // Replace this with your own encryption logic
  let encrypted_text = '';
  for (let i = 0; i < input_text.length; i++) {
    encrypted_text += String.fromCharCode(input_text.charCodeAt(i) + key);
  }
  return encrypted_text;
}

app.post('/encrypt', (req, res) => {
  // Get the input key and text
  const key = req.body.key;
  const input_text = req.body.text;

  // Encrypt the input text using your custom encryption function
  const encrypted_text = myEncryptFunction(key, input_text);

  // Return the encrypted text as JSON
  res.json({encrypted_text: encrypted_text});
});

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
