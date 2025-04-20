const http = require('http');
const nodemailer = require('nodemailer');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  // Handle the root URL
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the email server');
    return;
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle the email sending request
  if (req.method === 'POST' && req.url === '/send-email') {
    let body = '';

    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const { email } = querystring.parse(body);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashish1282005@gmail.com',
          pass: 'wpkl wlnm cuph dcdz',
        },
      });

      const mailOptions = {
        from: 'ashish1282005@gmail.com',
        to: email,
        subject: 'Thanks for contacting us!',
        text: 'We received your message and will get back to you soon.',
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end('Error sending email');
        } else {
          res.writeHead(200);
          res.end('Email sent successfully');
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Change port if necessary
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
