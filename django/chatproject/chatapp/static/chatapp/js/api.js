let currentUser = null;
let replyTo = null; // store reply target

function loginWithGoogle() {
    // Simulate authentication
    currentUser = "GoogleUser";
    document.getElementById("auth-buttons").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
}

function loginWithGithub() {
    currentUser = "GithubUser";
    document.getElementById("auth-buttons").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
}

function replyMessage(msgId, author) {
    replyTo = msgId;
    let input = document.getElementById("message-input");
    input.placeholder = `Replying to ${author}...`;
    input.focus();
}

async function loadMessages() {
    let res = await fetch('/api/messages/');
    let data = await res.json();
  
    let chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = "";
    data.reverse().forEach(msg => {
        let div = document.createElement('div');
        div.className = msg.author_name === currentUser ? "message sent" : "message received";
        div.innerHTML = `
            <p>${msg.content}</p>
            <small>${msg.author_name} | ${new Date(msg.timestamp).toLocaleTimeString()}</small>
            <div class="reply-btn" onclick="replyMessage(${msg.id}, '${msg.author_name}')">
                <i>↩</i> Reply
            </div>
        `;
        chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    let input = document.getElementById('message-input');
    let content = input.value;

    if (!content.trim()) return;

    let res = await fetch('/api/send/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({content, reply_to: replyTo})
    });

    if(res.ok){
        input.value = "";
        input.placeholder = "Type a message...";
        replyTo = null;
        loadMessages();
    }
}

setInterval(loadMessages, 3000);
