let messages = [];

function navigateTo(destination) {
  console.log(`Navigating to ${destination}`);
}

function showChatbot() {
  document.getElementById('chatbot').style.display = 'block';
}

function closeChatbot() {
  document.getElementById('chatbot').style.display = 'none';
}

function sendMessage() {
  const inputElement = document.getElementById('chat-input');
  const messageText = inputElement.value.trim();
  if (messageText) {
    const userMessage = { text: messageText, user: true };
    messages.push(userMessage);
    displayMessage(userMessage);
    inputElement.value = '';

    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage = { text: botResponse.text, user: false };
      messages.push(botMessage);
      displayMessage(botMessage);

      // Handle follow-up if applicable
      if (botResponse.followUp) {
        setTimeout(() => {
          const followUpMessage = { text: botResponse.followUp, user: false };
          messages.push(followUpMessage);
          displayMessage(followUpMessage);
        }, 500);
      }
    }, 500);
  }
}

function displayMessage(message) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${message.user ? 'user-message' : 'bot-message'}`;
  messageElement.innerHTML = message.text;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  let botResponse = {
    text: "I'm sorry, I didn't understand that. Could you please rephrase?",
    followUp: null
  };

  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    botResponse.text = 'Hello! Welcome to my portfolio. How can I assist you today?';
  } else if (lowerInput.includes('skills')) {
    botResponse.text = 'I have skills in JavaScript, Python, and web development. What specific skills are you interested in?';
    botResponse.followUp = 'I can also help with frameworks like React and Django!';
  } else if (lowerInput.includes('qualifications')) {
    botResponse.text = 'I hold a Bachelor\'s degree in Computer Science and various professional certifications. Would you like to know more about my educational background?';
  } else if (lowerInput.includes('certificates')) {
    botResponse.text = 'I have several certifications, including AWS Certified Solutions Architect and Google Analytics. Do you want to hear more about a specific certification?';
    botResponse.followUp = 'I can also share how I obtained these certifications.';
  } else if (lowerInput.includes('contact')) {
    botResponse.text = 'You can contact me at myemail@example.com or reach out via LinkedIn. Would you like the link to my LinkedIn profile?';
    botResponse.followUp = 'Feel free to ask about my availability for networking!';
  } else if (lowerInput.includes('projects')) {
    botResponse.text = 'I have worked on several projects, including a personal website and an e-commerce platform. Would you like details on a specific project?';
    botResponse.followUp = 'I can share links to my GitHub repositories as well!';
  } else if (lowerInput.includes('experience')) {
    botResponse.text = 'I have over three years of experience in software development, primarily focusing on full-stack development. Would you like to know more about my work experience?';
    botResponse.followUp = 'I can provide details about my previous roles and responsibilities.';
  } else if (lowerInput.includes('interests')) {
    botResponse.text = 'I’m interested in web development, machine learning, and open-source projects. What about your interests?';
  } else if (lowerInput.includes('yes')) {
    botResponse.text = 'Great! What would you like to know more about? Skills, qualifications, or maybe my projects?';
  } else if (lowerInput.includes('no')) {
    botResponse.text = 'No problem! Feel free to ask anything else or let me know if you want to explore something different.';
  }

  return botResponse;
}

function clearMessages() {
  messages = [];
  document.getElementById('chat-messages').innerHTML = '';
}
