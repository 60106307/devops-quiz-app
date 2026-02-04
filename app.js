document.addEventListener("DOMContentLoaded", () => {
  const topicSelect = document.getElementById("topic");
  const questionContainer = document.getElementById("question-container");
  const feedbackContainer = document.getElementById("feedback-container");

  let questions = [];
  
  // Fetch questions from the JSON file
  fetch("data/questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      displayQuestion();
    });

  function displayQuestion() {
    const selectedTopic = topicSelect.value;
    const question = questions.find(q => q.topic === selectedTopic);

    if (question) {
      questionContainer.innerHTML = `
        <p>${question.question}</p>
        <ul>
          ${question.options.map((option, index) => 
            `<li><button class="answer-option" data-index="${index}">${option}</button></li>`
          ).join("")}
        </ul>
      `;

      // Add event listeners to answer buttons
      document.querySelectorAll(".answer-option").forEach(button => {
        button.addEventListener("click", (e) => {
          const selectedIndex = e.target.getAttribute("data-index");
          showFeedback(question, selectedIndex);
        });
      });
    }
  }

  function showFeedback(question, selectedIndex) {
    const isCorrect = selectedIndex == question.answerIndex;
    feedbackContainer.innerHTML = `
      <p>${isCorrect ? "Correct!" : "Incorrect!"}</p>
      <p>${question.explanation}</p>
    `;
  }
});
