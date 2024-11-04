let messages = [];

function navigateTo(destination) {
  console.log(`Navigating to ${destination}`);
}

function showChatbot() {
  document.getElementById('chatbot').style.display = 'block';

  // Trigger initial options when the bot opens
  const welcomeMessages = [
    "Welcome to my portfolio. How can I assist you today?",
    "1. Skills",
    "2. Qualifications",
    "3. Certificates",
    "4. Projects",
    "5. Experience",
    "6. Contact Info",
    "7. Interests",
    "Please type the number of your choice (1-7)."
  ];

  // Send each message separately with a delay
  welcomeMessages.forEach((text, index) => {
    setTimeout(() => {
      const botMessage = { text: text, user: false };
      messages.push(botMessage);
      displayMessage(botMessage);
    }, index * 500); // 500ms delay between messages
  });
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
  
  // Add a class to differentiate between user and bot messages
  messageElement.className = `chat-message ${message.user ? 'user-message' : 'bot-message'}`;
  
  // Set inner HTML with an icon for the message
  messageElement.innerHTML = `
    <div class="message-content">
      <span class="message-icon">
        ${message.user ? '👤' : '🤖'}
      </span>
      <p>${message.text}</p>
    </div>
  `;
  
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  let botResponse = {
    text: '',
    followUp: null
  };

  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    // Welcome message and options are handled in showChatbot, so nothing is needed here.
  } else if (lowerInput.includes('skills') || lowerInput.includes('1')) {
    botResponse.text = 'I possess a diverse set of skills, including programming in JavaScript, Python, and Java. I also perform data analysis, leveraging statistical methods and tools to derive insights from complex datasets. Additionally, I have experience in both mobile and web development, where I create user-friendly applications and responsive websites that enhance user engagement and experience.';
  } else if (lowerInput.includes('qualifications') || lowerInput.includes('2')) {
    botResponse.text = "I hold a Bachelor's degree in Mathematics and Computer Science from the University of Limpopo and am currently enrolled in an Honours program in Computer Science.";
  } else if (lowerInput.includes('certificates') || lowerInput.includes('3')) {
    botResponse.text = 'I hold several relevant certifications, including the Azure AI Engineer Associate, which validates my expertise in designing and implementing AI solutions on Microsoft Azure. Additionally, I have completed the Microsoft Azure Fundamentals certification, providing me with a solid foundation in cloud concepts and services. I also hold the Microsoft Azure AI Fundamentals certification, which showcases my understanding of AI and machine learning concepts within the Azure environment. Furthermore, I have completed an "Introduction to Programming" course, as well as a "Complete Coding for Beginners" program, equipping me with essential programming skills and knowledge.';
  } else if (lowerInput.includes('projects') || lowerInput.includes('4')) {
    botResponse.text = 'I have worked on several projects, including a personal website and an e-commerce platform.';
    botResponse.followUp = 'Here is a link to my GitHub repositories to check the projects https://github.com/NkosinathiSeptember23';
  } else if (lowerInput.includes('experience') || lowerInput.includes('5')) {
    botResponse.text = 'I have six months of experience as an AI and Data Science intern at Gijima Holdings.';
  } else if (lowerInput.includes('contact info') || lowerInput.includes('6')) {
    botResponse.text = 'You can contact me at nmabena415@gmail.com, 0729692671, or reach out via LinkedIn https://www.linkedin.com/in/nkosinathi-sibiya-b32709254/';
  } else if (lowerInput.includes('interests') || lowerInput.includes('7')) {
    botResponse.text = 'I’m interested in web development, machine learning, and open-source projects. What about your interests?';
  } else if (lowerInput.includes('no')) {
    botResponse.text = 'No problem! Feel free to ask anything else or let me know if you want to explore something different.';
  }

  return botResponse;
}

function clearMessages() {
  messages = [];
  document.getElementById('chat-messages').innerHTML = '';
}
