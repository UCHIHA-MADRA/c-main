// popup.js

document.getElementById('translateButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
    translateText(text);
    chrome.runtime.sendMessage({ action: 'translate', text }, (response) => {
        if (chrome.runtime.lastError) {
            document.getElementById('translationResult').textContent = 'Translation failed';
        } else if (response.error) {
            document.getElementById('translationResult').textContent = 'Translation failed';
        } else {
            document.getElementById('translationResult').textContent = `Translation: ${response.translation}`;
        }
    }); // <-- Added a closing parenthesis here
});

async function translateText(text) {
    const response = await fetch('http://localhost:3000/translate/hindi-to-english', { // Update the URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('translationResult').textContent = `Translation: ${data.translation}`;
    } else {
        document.getElementById('translationResult').textContent = 'Translation failed';
    }
} // <-- Added a missing semicolon here
