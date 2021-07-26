// Pass servers location
const socket = io('http://localhost:3000');

// Get DOM-elements
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// Get user's name
const name = prompt('Enter your name');
// Notify that user's joined
appendMessage(`${name} (you) joined`, true);
// Send user's name to the server
socket.emit('new-user', name);

// Get another user's name
socket.on('user-connected', (name) => {
  appendMessage(`${name} joined`);
});

// Notify a user's disconnected
socket.on('user-disconnected', (name) => {
  appendMessage(`${name} left`);
});

// Get another user's message
socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

// Send message to the server and show on user's screen
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, true);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-box');
  if (isUser) {
    messageElement.classList.add('user-message');
  } else {
    messageElement.classList.add('partner-message');
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
