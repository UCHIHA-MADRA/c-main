
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose your desired port

app.use(bodyParser.json());

// Define a route for translating from Hindi to English using ChatGPT
app.post('/translate/hindi-to-english', async (req, res) => {
    const { text } = req.body;

    try {
        const translatedText = await translateText(text, 'hi', 'en');
        res.json({ translation: translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

// Define a route for translating from English to Hindi using ChatGPT
app.post('/translate/english-to-hindi', async (req, res) => {
    const { text } = req.body;

    try {
        const translatedText = await translateText(text, 'en', 'hi');
        res.json({ translation: translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

// Define a route for retrieving translations by ID using GET
app.get('/translation/:id', (req, res) => {
    const translationId = req.params.id;

    // Implement logic to retrieve translation by ID (replace with your actual logic)
    const retrievedTranslation = `Translation for ID ${translationId}`;

    res.json({ translation: retrievedTranslation });
});

// Function to translate text using ChatGPT
async function translateText(text, sourceLanguage, targetLanguage) {
    // Replace with your OpenAI GPT-3.5 API key
    const apiKey = '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';

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that translates text.' },
                { role: 'user', content: text },
                { role: 'assistant', content: 'Translate the following text:' },
            ],
            language: targetLanguage,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        const translatedText = response.data.choices[0].message.content;
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}
// Add this after your routes
app.use((req, res, next) => {
    res.status(404).send("404 - Not Found");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

