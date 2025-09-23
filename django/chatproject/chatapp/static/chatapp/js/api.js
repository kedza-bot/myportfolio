let currentUser = null;
let replyTo = null; // store reply target

// ------------------- CSRF helper -------------------
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// ------------------- Reply function -------------------
function replyMessage(msgId, author) {
    replyTo = msgId;
    let input = document.getElementById("message-input");
    input.placeholder = `Replying to ${author}...`;
    input.focus();
}

// ------------------- Load messages -------------------
async function loadMessages() {
    try {
        let res = await fetch('/api/messages/');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        let data = await res.json();

        let chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = "";

        data.reverse().forEach(msg => {
            let div = document.createElement('div');
            div.className = msg.author_name === currentUser ? "message sent" : "message received";

            let replyHtml = "";
            if (msg.reply_to) {
                replyHtml = `
                    <div class="reply-context">
                        ↪ Replying to <b>${msg.reply_to.author_name}</b>: 
                        <em>${msg.reply_to.content}</em>
                    </div>
                `;
            }

            div.innerHTML = `
                ${replyHtml}
                <p>${msg.content}</p>
                <small>${msg.author_name} | ${new Date(msg.timestamp).toLocaleTimeString()}</small>
                <div class="reply-btn" onclick="replyMessage(${msg.id}, '${msg.author_name}')">
                    <i>↩</i> Reply
                </div>
            `;
            chatBox.appendChild(div);
        });

        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        console.error("Failed to load messages:", err);
    }
}

// ------------------- Send message -------------------
async function sendMessage() {
    let input = document.getElementById('message-input');
    let content = input.value.trim();

    if (!content) return;

    try {
        let res = await fetch('/api/send/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({content, reply_to: replyTo})
        });

        if (!res.ok) {
            let errText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        input.value = "";
        input.placeholder = "Type a message...";
        replyTo = null;
        loadMessages();
    } catch (err) {
        console.error("Failed to send message:", err);
    }
}

// ------------------- Get current user -------------------
async function getCurrentUser() {
    try {
        let res = await fetch('/api/current_user/');
        let data = await res.json();
        currentUser = data.username;

        if (currentUser) {
            document.getElementById("auth-buttons").style.display = "none";
            document.getElementById("chat-container").style.display = "flex";
            loadMessages();
        }
    } catch (err) {
        console.error("Failed to get current user:", err);
    }
}

// ------------------- Initialize -------------------
getCurrentUser();
setInterval(loadMessages, 3000);
