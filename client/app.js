const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))

let userName ;

function login (e) {
    e.preventDefault();

    if (userNameInput.value == ''){
        alert('Upss... Login is missing : )')
    } else { 
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
    socket.emit('newUser', userName);
};

socket.on('newUser', newUser => {
    addMessage('Chat Bot', `${newUser} has joined the conversation! : - )`);
  })
  
  socket.on('userLeft', oldUser => {
    addMessage('Chat Bot', `${oldUser.userName} has left the conversation... ;(`);
  })

function sendMessage(e) {
    e.preventDefault();
  
    let messageContent = messageContentInput.value;
  
    if(!messageContent.length) {
      alert('Upss... text content needed : ) ');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  
  }

  const addMessage = (author, content) => {
    console.log('addMessage():', author, content, userName);
    const message = document.createElement('li');
    message.classList.add('message', 'message--received', author === 'Chat Bot' ? 'message--bot' : author === userName ? 'message--self' : null);
    message.innerHTML = '<h3 class="message__author">' + (author === userName ? 'You' : author ) + '</h3><div class="message__content">' + content + '</div>';
    messagesList.appendChild(message)
  }

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage)