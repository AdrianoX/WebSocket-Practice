const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

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
};

function sendMessage(e) {
    e.preventDefault();

    if(messageContentInput.value == ''){
        alert('Upss... text content needed : ) ')
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage)