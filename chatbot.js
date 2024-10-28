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
    botResponse.text = `
      <div>
        <p>Welcome to my portfolio. How can I assist you today? Here are some options:</p>
        <ul>
          <li>1. Skills</li>
          <li>2. Qualifications</li>
          <li>3. Certificates</li>
          <li>4. Projects</li>
          <li>5. Experience</li>
          <li>6. Contact Info</li>
        </ul>
        <p>Please type the number of your choice (1-6).</p>
      </div>
    `;
  } else if (lowerInput.includes('skills') || lowerInput.includes('1')) {
    botResponse.text = 'I possess a diverse set of skills, including  programming in JavaScript, Python, and Java. I also perform data analysis, leveraging statistical methods and tools to derive insights from complex datasets. Additionally, I have experience in both mobile and web development, where I create user-friendly applications and responsive websites that enhance user engagement and experience.';
  } else if (lowerInput.includes('qualifications') || lowerInput.includes('2')) {
    botResponse.text = 'I hold a Bachelor\'s degree in Mathematics and Computer Science completed from the university of Limpopo and Currently enrolled for honours in computer science.';
  } else if (lowerInput.includes('certificates')) {
    botResponse.text = 'I hold several relevant certifications, including the Azure AI Engineer Associate, which validates my expertise in designing and implementing AI solutions on Microsoft Azure. Additionally, I have completed the Microsoft Azure Fundamentals certification, providing me with a solid foundation in cloud concepts and services. I also hold the Microsoft Azure AI Fundamentals certification, which showcases my understanding of AI and machine learning concepts within the Azure environment. Furthermore, I have completed an "Introduction to Programming" course, as well as a "Complete Coding for Beginners" program, equipping me with essential programming skills and knowledge.'
  } else if (lowerInput.includes('contact info') || lowerInput.includes('6')) {
    botResponse.text = 'You can contact me at nmabena415@gmail.com,0729692671 or reach out via LinkedIn(https://www.linkedin.com/in/nkosinathi-sibiya-b32709254/)'
  } else if (lowerInput.includes('projects') || lowerInput.includes('4')){
    botResponse.text = 'I have worked on several projects, including a personal website and an e-commerce platform.';
    botResponse.followUp = 'Here is a link to my GitHub repositories to check the projects https://github.com/NkosinathiSeptember23 ';
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
