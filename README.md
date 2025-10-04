# Reddit AI Comment Generator (Chrome Extension)

A powerful Chrome Extension that uses the blazing-fast Groq AI API to generate insightful and engaging comments for Reddit posts. This tool helps you engage with communities more efficiently by providing relevant comment suggestions with a single click.

<!-- TODO: Add a GIF or screenshot of the extension in action. A short screen recording converted to a GIF is highly recommended. -->
![Demo Screenshot](https://via.placeholder.com/800x450.png?text=Add+a+Screenshot+or+GIF+of+the+Extension)

## ✨ Features

- **Seamless Integration:** Automatically adds a "✨ Generate Comment" button to every post in your Reddit feed and on post pages.
- **Instant Suggestions:** Generates three unique and context-aware comment suggestions.
- **Blazing Fast:** Powered by the Groq API for near-instantaneous AI responses.
- **Completely Free:** Uses Groq's generous free tier, requiring no credit card or billing information.
- **One-Click Copy:** Simply click on your preferred suggestion to copy it to your clipboard.
- **Simple Setup:** Easy to configure with your own free Groq API key.

## 🛠️ Technology Stack

- **Frontend:** JavaScript (ES6+), HTML5, CSS3
- **Browser API:** Chrome Extension Manifest V3, Shadow DOM querying
- **AI Backend:** Groq API using the `llama-3.1-8b-instant` model.

## 🚀 Installation and Setup

Follow these steps to get the extension up and running on your local machine.

### 1. Clone the Repository

First, clone this repository to your local machine using Git:

```bash
git clone https://github.com/wpslakshitha/reddit-comment-generator.git
```

If you downloaded the files as a ZIP, simply unzip them into a folder.

### 2. Get a Free Groq API Key

This extension is powered by Groq, which offers a completely free and fast API.

1.  Go to the [Groq Console](https://console.groq.com/keys).
2.  Sign up for a new account using your Google account or email (it's free and no credit card is required).
3.  Once logged in, you will be directed to the **API Keys** section.
4.  Click **"+ Create API Key"**.
5.  Give your key a name (e.g., "Reddit Extension") and click **"Create"**.
6.  **Important:** Your new API key (starting with `gsk_...`) will be displayed. **Copy this key immediately and save it somewhere safe.** You will not be able to see it again after you close the window.

### 3. Load the Extension in Chrome

1.  Open your Google Chrome browser.
2.  Navigate to `chrome://extensions`.
3.  In the top-right corner, toggle on **"Developer mode"**.
4.  Three new buttons will appear. Click on **"Load unpacked"**.
5.  A file selection dialog will open. Navigate to and select the `reddit-comment-generator` folder that you created in Step 1.

The extension icon should now appear in your Chrome toolbar.

### 4. Configure the Extension

1.  Click on the "Reddit AI Comment Generator" icon in your Chrome toolbar.
2.  A small popup will appear. Paste the **Groq API key** you copied in Step 2 into the input field.
3.  Click the **"Save Key"** button.

That's it! The setup is complete.

## 💡 How to Use

1.  Navigate to [Reddit](https://www.reddit.com/).
2.  Find any post you want to comment on (either on the main feed or on the post's own page). You will see a new **"✨ Generate Comment"** button next to the standard "Share" button.
3.  Click the button. It will show "Generating..." for a moment.
4.  A box with three AI-generated comment suggestions will appear below the post.
5.  Click on any suggestion you like. It will automatically be copied to your clipboard.
6.  Click on the main "Comment" box on Reddit, paste (`Ctrl+V` or `Cmd+V`) your copied comment, and post it!

## 📂 File Structure

A brief overview of the key files in this project:

```
.
├── images/
│   ├── icon16.png, icon48.png, icon128.png
├── background.js       # Handles communication with the Groq API.
├── content.js          # Injects the button and suggestions into the LinkedIn page.
├── content.css         # Basic styles for injected elements.
├── manifest.json       # The core configuration file for the Chrome Extension.
├── popup.html          # The HTML for the professional settings popup.
├── popup.css           # Styles for the popup UI.
├── popup.js            # The JavaScript logic for subscription and saving settings.
└── README.md           # You are here!
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
