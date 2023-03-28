const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Define your encryption function
function Arccrypt(key, input_text) {
  
  let p1 = key.length();
  let p2 = key.charAt(p1);
  p2 = p2.toFixed(0);
  let sk;
  
  if (p2 >= 0) {
       if (p2 <= 65535) {
         sk = String.fromCharCode(p2);
       } else {
          p2 = p2/p1;
          p2 = p2.toFixed(0);
          sk = String.fromCharCode(p2);
       }
  } else {
    p2 = p2 * p1 + 1;
    sk = String.fromCharCode(p2);
  }
  
  let p3 = key.length();
  let p4 = (p2 + 1) / ((p1 * p3) + 25);
  p4 = p4.toFixed(0);
  let p5 = p4 * p1;
   
  let ek;
  
  if (p5 >= 0) {
       if (p5 <= 65535) {
         ek = String.fromCharCode(p5);
       } else {
          p5 = p5/(p4 + 1);
         p5 = p5.toFixed(0);
          ek = String.fromCharCode(p5);
       }
  } else {
    p5 = p5 * p4 + 1;
    ek = String.fromCharCode(p5);
  }
  
  

  
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
