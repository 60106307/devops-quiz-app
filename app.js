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
      displayQuestion(); // Display the question when the page loads
    })
    .catch(error => {
      console.log("Error loading questions:", error); // Log any errors
    });

  // Function to display the question based on the selected topic
  function displayQuestion() {
    const selectedTopic = topicSelect.value;
    console.log("Selected Topic:", selectedTopic); // Log selected topic
    const question = questions.find(q => q.topic === selectedTopic);
    console.log("Question:", question); // Log the found question

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
    } else {
      questionContainer.innerHTML = `<p>No questions available for this topic.</p>`;
    }
  }

  // Update the question when the dropdown selection changes
  topicSelect.addEventListener("change", () => {
    displayQuestion(); // Re-run the function when the topic is changed
  });

  // Show feedback for the selected answer
  function showFeedback(question, selectedIndex) {
    const isCorrect = selectedIndex == question.answerIndex;
    feedbackContainer.innerHTML = `
      <p>${isCorrect ? "Correct!" : "Incorrect!"}</p>
      <p>${question.explanation}</p>
    `;
  }
});
