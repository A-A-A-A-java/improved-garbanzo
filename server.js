require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI client with your secret key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend from /public folder

// API endpoint for chatting
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

 const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: userMessage }
  ]
});


    const botReply = completion.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ reply: "Oops! Something went wrong on the server." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
