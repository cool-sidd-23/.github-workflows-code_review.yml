const axios = require('axios');
const fs = require('fs');

const API_KEY = 'YOUR_OPENAI_API_KEY';
const OPENAI_URL = 'https://api.openai.com/v1/completions';

const analyzeCodeWithAI = async (code) => {
  try {
    const response = await axios.post(OPENAI_URL, {
      model: "gpt-4",
      prompt: `Please review the following JavaScript code and provide improvement suggestions:\n\n${code}`,
      max_tokens: 150,
      temperature: 0.5
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error with AI review:', error);
    return null;
  }
};

// Read code from a file and pass it to AI
fs.readFile('some_file.js', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  analyzeCodeWithAI(data).then(review => {
    console.log('AI Review:', review);
  });
});
