// Quizzes
// const questions = [
//   { question: "What is 2 + 2?", answer: "4" },
//   { question: "What is the capital of France?", answer: "Paris" }
// ];

// let currentQuestionIndex = 0;

// document.getElementById('send-button').addEventListener('click', function () {
//   const userInput = document.getElementById('user-input').value;
//   const chatArea = document.getElementById('chat-area');

//   // Display user message
//   const userMessage = document.createElement('div');
//   userMessage.classList.add('message', 'user-message');
//   userMessage.textContent = userInput;
//   chatArea.appendChild(userMessage);

//   // Check the answer and respond
//   const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
//   if (userInput.toLowerCase() === correctAnswer) {
//     const botMessage = document.createElement('div');
//     botMessage.classList.add('message', 'bot-message');
//     botMessage.textContent = "Correct! Well done!";
//     chatArea.appendChild(botMessage);
//   } else {
//     const botMessage = document.createElement('div');
//     botMessage.classList.add('message', 'bot-message');
//     botMessage.textContent = `Oops, that's not right. The correct answer is: ${correctAnswer}`;
//     chatArea.appendChild(botMessage);
//   }

//   // Move to the next question
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     const nextQuestion = document.createElement('div');
//     nextQuestion.classList.add('message', 'bot-message');
//     nextQuestion.textContent = questions[currentQuestionIndex].question;
//     chatArea.appendChild(nextQuestion);
//   } else {
//     const botMessage = document.createElement('div');
//     botMessage.classList.add('message', 'bot-message');
//     botMessage.textContent = "You've completed the quiz! Great job!";
//     chatArea.appendChild(botMessage);
//   }

//   // Scroll to the bottom
//   chatArea.scrollTop = chatArea.scrollHeight;

//   // Clear the input
//   document.getElementById('user-input').value = '';
// });  

// Info Tabs
const infoTabs = document.querySelectorAll('.expandable-list-tab');
infoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tab.classList.toggle("active");
    const infoBody = tab.querySelector('.expandable-list-content');
    if (tab.classList.contains("active")) {
      infoBody.style.maxHeight = infoBody.scrollHeight + "px";
    } else {
      infoBody.style.maxHeight = 0;
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