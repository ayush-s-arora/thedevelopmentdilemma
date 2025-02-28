// Quizzes
export function quizBot() {
  const questions = [
    { question: "Which of the following is NOT considered a domestic factor that directly affects development? Type the number that corresponds to your answer. (e.g., \"1\" without the quotation marks) \n1. Geography, 2. Infrastructure, 3. Inflation, 4. Rule of Law", answer: "3" },
    { question: "Which of the following is an explanation for the resource curse? \n1. Religion, 2. Corruption, 3. Illegal drug use, 4. International bargaining power", answer: "2" },
    { question: "Which set of industrialization policies tends to help nations develop more? \n1. EOI helps more than ISI, 2. ISI helps more than EOI", answer: "1" },
    { question: "Which of the following usually occured in tropical colonies? \n1. Movement, 2. Extraction", answer: "2" },
    { question: "Which of the following most accurately describes the usual population of LDCs? \n1. Older, 2. Racially diverse, 3. Small, 4. Younger", answer: "4" },
    { question: "Mexico employed which of the following from the 1960s to the 1980s? \n1. Cooperative trade agreements , 2. High tariffs, 3. Non-state ownership of basic industries, 4. Export subsidies", answer: "2" },
    { question: "Which of the following is an example of an oligopoly? \n1. The agricultural market, 2. The stock market, 3. Street vendors, 4. The wireless carrier industry", answer: "4" },
    { question: "Which of the following is NOT a characteristic of rule of law? \n1. Reliability, 2. Dependability, 3. Strict punishments, 4. Regulation", answer: "3" },
    { question: "Which of the following is a concern that arises from being a landlocked nation? \n1. Gas prices, 2. Government corruption, 3. Inhibited trade, 4. Inferior infrastructure", answer: "3" },
    { question: "LDCs tend to specialize in ____ \n1. Primary products, 2. Financial services, 3. Secondary products, 4. Timber", answer: "1" }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let isHandlingAnswer = false;

  const answerButton = document.getElementById('answer-button');
  const userInputElement = document.getElementById('user-input');
  const chatArea = document.getElementById('chat-area');
  const scoreDisplay = document.getElementById('score');
  const sender = document.getElementById('sender-name')

  function askQuestion() {
    setTimeout(() => {
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 100);
    if (currentQuestionIndex < questions.length) {
      const botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot-message', 'fade-in-slide-up');
      botMessage.innerHTML = questions[currentQuestionIndex].question.replace(/\n/g, '<br>');
      chatArea.appendChild(botMessage);
      setTimeout(() => botMessage.classList.add('show'), 1000);
    } else {
      const botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot-message', 'fade-in-slide-up');
      botMessage.textContent = ` Your final score is ${score}/${questions.length}. I hope you had fun and learned something!`;
      chatArea.appendChild(botMessage);
      setTimeout(() => botMessage.classList.add('show'), 1000);
      scoreDisplay.innerHTML = `<strong>Final Score: ${score}/${questions.length}</strong>`;
      const disconnectedIndicator = document.createTextNode('[Disconnected] ');
      sender.prepend(disconnectedIndicator);
      userInputElement.value = "";
      userInputElement.disabled = true;
      answerButton.disabled = true;
    }
  }

  let debounceTimeout;

  function handleAnswer() {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (isHandlingAnswer) return;
      isHandlingAnswer = true;

      try {
        const userInput = userInputElement.value.trim();
        if (!userInput) {
          isHandlingAnswer = false;
          return;
        }
        scoreDisplay.innerHTML = `<strong>Score: ${score}/${questions.length}</strong>`;

        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message', 'fade-in-slide-up');
        userMessage.textContent = userInput;
        chatArea.appendChild(userMessage);
        setTimeout(() => userMessage.classList.add('show'), 10);

        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message', 'fade-in-slide-up');


        const correctMessages = [
          "That's right!",
          "Yep!",
          "Perfect!",
          "Great work!"
        ];
        const incorrectMessages = [
          "Nope, sorry.",
          "Whoops!",
          "Not quite.",
          "Agh, unfortunately not correct."
        ];

        let randomIndex = Math.floor(Math.random() * correctMessages.length);

        if (userInput.toLowerCase() === correctAnswer) {
          botMessage.textContent = correctMessages[randomIndex];
          score++;
        } else {
          const incorrectIndex = Math.floor(Math.random() * incorrectMessages.length);
          botMessage.textContent = `${incorrectMessages[incorrectIndex]} The correct answer is: ${correctAnswer}`;
        }

        chatArea.appendChild(botMessage);
        setTimeout(() => botMessage.classList.add('show'), 1000);
        chatArea.scrollTop = chatArea.scrollHeight;
        userInputElement.value = '';

        currentQuestionIndex++;
        scoreDisplay.innerHTML = `<strong>Score: ${score}/${questions.length}</strong>`;

        setTimeout(() => {
          askQuestion();
          isHandlingAnswer = false;
        }, 1000);
      } catch (error) {
        console.error("Error in handleAnswer:", error);
        isHandlingAnswer = false;
      }
    }, 200);
  }

  answerButton.addEventListener('click', handleAnswer);
  userInputElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAnswer();
    }
  });
  askQuestion();
}

// Info Tabs
const infoItems = document.querySelectorAll('.expandable-list-item');

infoItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const tab = item.closest('.expandable-list-tab');
    if (tab) {
      tab.classList.toggle("active");
      const infoBody = tab.querySelector('.expandable-list-content');
      if (tab.classList.contains("active")) {
        infoBody.style.maxHeight = infoBody.scrollHeight + "px";
      } else {
        infoBody.style.maxHeight = 0;
      }
    }
  });
});

//Track visited pages
export function addVisitedPage(pageIdentifier) {
  let visitedPages = sessionStorage.getItem('visitedPages');
  if (visitedPages) {
    visitedPages = JSON.parse(visitedPages);
  } else {
    visitedPages = [];
  }
  if (!visitedPages.includes(pageIdentifier)) {
    visitedPages.push(pageIdentifier);
    sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
  }
}

// Check to see if user has visited all development module pages. If they have, "unlock" the puzzle solution
export function unlockPuzzleSolve() {
  let visitedPages = sessionStorage.getItem('visitedPages');
  if (visitedPages) {
    visitedPages = JSON.parse(visitedPages);
    return (visitedPages.includes('development') && visitedPages.includes('factorsDomestic') && visitedPages.includes('factorsInternational'));
  }
  return false;
}

const letterLinks = document.querySelectorAll('.letter-navigation a');

letterLinks.forEach(link => {
  const targetLetterId = link.getAttribute('href').substring(1);
  const targetLetter = document.getElementById(targetLetterId);

  if (targetLetter) { //to see if the letter exists in glossary
    link.classList.add('exists');
    link.addEventListener('click', function (event) {
      event.preventDefault();
      targetLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.querySelector('.transition-page');
  if (currentPage) {
    currentPage.classList.add('active'); // Fade in current page
  }

  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      event.preventDefault();

      if (currentPage) {
        currentPage.classList.add('out'); // Fade out current page
        setTimeout(() => {
          window.location.href = href;
        }, 400); // Match transition duration
      } else {
        window.location.href = href;
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.querySelector('.transition-page');
  const overlay = document.querySelector('.overlay');

  if (currentPage) {
    currentPage.classList.add('active');
    overlay.classList.add('active'); // Fade in overlay
  }

  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      // ... existing link click logic ...
      if (currentPage) {
        currentPage.classList.add('out');
        overlay.classList.add('out'); // Fade out overlay
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
});