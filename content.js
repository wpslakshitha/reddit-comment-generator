function addGenerateButton(postElement) {
    if (postElement.shadowRoot.querySelector('.ai-comment-generator-btn')) {
        return;
    }

    // Action bar එක Shadow DOM එක ඇතුළෙන් හොයාගන්නවා
    const actionBar = postElement.shadowRoot.querySelector('div[data-testid="action-row"]');
    
    if (!actionBar) {
        return;
    }

    const button = document.createElement('button');
    button.innerText = '✨ Generate Comment';
    button.className = 'ai-comment-generator-btn';

    // Styles (same as before)
    button.style.marginLeft = '8px';
    button.style.padding = '4px 12px';
    button.style.border = '1px solid var(--color-neutral-content-weak)';
    button.style.backgroundColor = 'var(--color-neutral-background)';
    button.style.color = 'var(--color-neutral-content)';
    button.style.borderRadius = '9999px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '12px';
    button.style.fontWeight = 'bold';
    button.onmouseover = () => { button.style.backgroundColor = 'var(--color-neutral-background-hover)'; };
    button.onmouseout = () => { button.style.backgroundColor = 'var(--color-neutral-background)'; };

    button.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // --- වැදගත්ම වෙනස මෙතන ---
        // Title එක සහ Body එක Shadow DOM එකෙන් පිටතින් (light DOM) හොයාගන්නවා
        // ඔබ එවූ HTML එකට අනුව, මේවා තමයි නිවැරදිම selectors
        const titleElement = postElement.querySelector('h1[slot="title"]');
        const bodyElement = postElement.querySelector('shreddit-post-text-body');
        
        let postText = titleElement ? titleElement.innerText : '';
        if (bodyElement) {
            postText += '\n\n' + bodyElement.innerText;
        }

        if (!postText.trim()) {
            const imagePostCheck = postElement.shadowRoot.querySelector('[slot="image-content"]');
            if (imagePostCheck) {
                 alert('This post appears to be an image. Text analysis is not yet supported.');
            } else {
                 alert('Could not extract text from this post.');
            }
            return;
        }
        
        button.innerText = 'Generating...';
        button.disabled = true;

        chrome.runtime.sendMessage({ action: "generateComment", postText: postText }, (response) => {
            button.innerText = '✨ Generate Comment';
            button.disabled = false;
            
            const oldSuggestions = postElement.querySelector('.ai-suggestions-container');
            if (oldSuggestions) {
                oldSuggestions.remove();
            }

            if (response.error) {
                alert(`Error: ${response.error}`);
            } else if (response.comments) {
                displaySuggestions(postElement, response.comments);
            }
        });
    };

    actionBar.appendChild(button);
}

// displaySuggestions සහ ඉතුරු functions වල වෙනසක් නැහැ
function displaySuggestions(postElement, comments) {
    const container = document.createElement('div');
    container.className = 'ai-suggestions-container';
    container.style.border = '1px solid var(--color-neutral-border)';
    container.style.borderRadius = '8px';
    container.style.padding = '12px';
    container.style.margin = '10px 10px 0 10px';
    container.style.backgroundColor = 'var(--color-neutral-background-weak)';
    const title = document.createElement('h4');
    title.innerText = 'AI Suggestions (Click to copy):';
    title.style.margin = '0 0 10px 0';
    title.style.color = 'var(--color-neutral-content-strong)';
    container.appendChild(title);
    comments.forEach(commentText => {
        const suggestion = document.createElement('div');
        suggestion.innerText = `"${commentText}"`;
        suggestion.style.padding = '8px';
        suggestion.style.borderTop = '1px solid var(--color-neutral-border)';
        suggestion.style.cursor = 'pointer';
        suggestion.style.color = 'var(--color-neutral-content)';
        suggestion.onmouseover = () => { suggestion.style.backgroundColor = 'var(--color-neutral-background-hover)'; };
        suggestion.onmouseout = () => { suggestion.style.backgroundColor = 'transparent'; };
        suggestion.onclick = () => {
            navigator.clipboard.writeText(commentText).then(() => {
                const originalText = suggestion.innerText;
                suggestion.innerText = '✅ Copied!';
                suggestion.style.fontWeight = 'bold';
                suggestion.style.color = 'var(--color-success)';
                setTimeout(() => {
                    suggestion.innerText = originalText;
                    suggestion.style.fontWeight = 'normal';
                    suggestion.style.color = 'var(--color-neutral-content)';
                }, 1500);
            });
        };
        container.appendChild(suggestion);
    });
    postElement.appendChild(container);
}

function scanForPosts() {
    document.querySelectorAll('shreddit-post').forEach(addGenerateButton);
}
const observer = new MutationObserver((mutations) => {
    scanForPosts();
});
const targetNode = document.querySelector('shreddit-app');
if (targetNode) {
    observer.observe(targetNode, {
        childList: true,
        subtree: true
    });
}
setTimeout(scanForPosts, 2000);