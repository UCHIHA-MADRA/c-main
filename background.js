// background.js

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'translate') {
        try {
            const response = await fetch('http://localhost:3000/translate/hindi-to-english', { // Update the URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: request.text }),
            });

            if (response.ok) {
                const data = await response.json();
                sendResponse({ translation: data.translation });
            } else {
                sendResponse({ error: 'Translation failed' });
            }
        } catch (error) {
            sendResponse({ error: 'Translation failed' });
        }
    }
});
