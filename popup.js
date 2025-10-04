document.addEventListener('DOMContentLoaded', () => {
    const subscribeView = document.getElementById('subscribe-view');
    const settingsView = document.getElementById('settings-view');
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const subscribeStatus = document.getElementById('subscribe-status');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const settingsStatus = document.getElementById('settings-status');
    const apiKeyInput = document.getElementById('apiKey');
    const customPromptInput = document.getElementById('customPrompt');

    const DEFAULT_PROMPT = `You are a helpful assistant that generates engaging comments for the following Reddit post. Your tone can be casual, witty, or informative, but always civil. Generate three distinct comments. Respond with ONLY a valid JSON object in the format: { "comments": ["comment 1", "comment 2", "comment 3"] }. Do not include any other text or markdown. The post is:\n\n---\n\n`;

    // Check subscription status and show the correct view
    chrome.storage.sync.get('subscribed_reddit', (data) => {
        if (data.subscribed_reddit) {
            showSettingsView();
        } else {
            subscribeView.style.display = 'block';
            settingsView.style.display = 'none';
        }
    });

    // Handle Subscription
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
            showStatus(subscribeStatus, 'Please fill in all fields.', 'error');
            return;
        }

        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;

        try {
            const response = await fetch('https://data-sink-hub.vercel.app/api/collect/cmgcerbaq0001lb04ii028j6i', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            if (!response.ok) {
                // If the server gives a specific error message, you can try to show it
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || 'Subscription failed. Please try again.';
                throw new Error(errorMessage);
            }

            // Mark as subscribed and switch view
            chrome.storage.sync.set({ subscribed_reddit: true }, () => {
                showStatus(subscribeStatus, 'Subscription successful!', 'success');
                setTimeout(showSettingsView, 1000);
            });

        } catch (error) {
            showStatus(subscribeStatus, error.message, 'error');
        } finally {
            subscribeBtn.textContent = 'Subscribe & Continue';
            subscribeBtn.disabled = false;
        }
    });

    // Handle Settings
    saveSettingsBtn.addEventListener('click', () => {
        const apiKey = apiKeyInput.value;
        const customPrompt = customPromptInput.value;

        chrome.storage.sync.set({ 
            groqApiKey: apiKey, 
            customPrompt_reddit: customPrompt 
        }, () => {
            showStatus(settingsStatus, 'Settings saved successfully!', 'success');
        });
    });

    function showSettingsView() {
        subscribeView.style.display = 'none';
        settingsView.style.display = 'block';
        // Load existing settings
        chrome.storage.sync.get(['groqApiKey', 'customPrompt_reddit'], (data) => {
            if (data.groqApiKey) {
                apiKeyInput.value = data.groqApiKey;
            }
            customPromptInput.value = data.customPrompt_reddit || DEFAULT_PROMPT;
        });
    }
    
    function showStatus(element, message, type) {
        element.textContent = message;
        element.className = `status ${type}`;
        setTimeout(() => {
            element.textContent = '';
            element.className = 'status';
        }, 3000);
    }
});