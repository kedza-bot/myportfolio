async function loadMessages() {
  let res = await fetch('/api/messages/');
  let data = await res.json();
  
  let chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = "";
  data.reverse().forEach(msg => {
    let div = document.createElement('div');
    div.className = "message received"; // later check if it's user msg
    div.innerHTML = `<p>${msg.content}</p><small>${msg.author_name} | ${msg.timestamp}</small>`;
    chatBox.appendChild(div);
  });
}

async function sendMessage() {
  let input = document.getElementById('message-input');
  let content = input.value;

  let res = await fetch('/api/send/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + token (after login)
    },
    body: JSON.stringify({content})
  });

  if(res.ok){
    input.value = "";
    loadMessages();
  }
}

setInterval(loadMessages, 3000); // auto refresh every 3s
