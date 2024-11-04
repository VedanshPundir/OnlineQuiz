// Function to be called when the 'Start Quiz' button is clicked
function startQuiz() {
    document.getElementById('instructionsSection').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
}

// Questions Array
const questions = [
    {
        question: "1. What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        answer: "Paris"
    },
    {
        question: "2. Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Saturn", "Venus"],
        answer: "Mars"
    },
    {
        question: "3. Who wrote 'Hamlet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Leo Tolstoy"],
        answer: "William Shakespeare"
    },
    {
        question: "4. What is the smallest prime number?",
        options: ["2", "1", "3", "5"],
        answer: "2"
    },
    {
        question: "5. What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    }
];

let currentQuestionIndex = 0;
let userAnswers = {};

// Function to handle the form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get student details
    var studentName = document.getElementById("studentName").value;
    var batch = document.getElementById("batch").value;
    var sapId = document.getElementById("sapId").value;

    // Display student details in the next section
    document.getElementById("displayStudentName").textContent = studentName;
    document.getElementById("displayBatch").textContent = batch;
    document.getElementById("displaySapId").textContent = sapId;

    // Hide the welcome section and show the quiz details section
    document.getElementById("welcome").style.display = "none";
    document.getElementById("quizDetails").style.display = "block";
});

// Function to go back to the home section
function goBack() {
    // Show the welcome section and hide the quiz details section
    document.getElementById("welcome").style.display = "block";
    document.getElementById("quizDetails").style.display = "none";
}

// Function to start the quiz
function startQuiz() {
    // Hide the quiz details section and show the quiz section
    document.getElementById("quizDetails").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    // Start the timer
    startTimer(60);

    // Load the first question
    loadQuestion(currentQuestionIndex);
}

// Function to start the countdown timer
function startTimer(duration) {
    var timeLeft = duration;
    var timerInterval = setInterval(function() {
        document.getElementById("timeLeft").textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            submitQuiz(); // Automatically submit quiz when time's up
        }
    }, 1000);
}

// Function to load the current question
function loadQuestion(index) {
    let questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = '';

    let questionObj = questions[index];
    let questionHTML = `<h2>${questionObj.question}</h2>`;

    questionObj.options.forEach((option, i) => {
        questionHTML += `
            <div class="option" onclick="selectOption(this)">
                <input type="radio" id="option${index}${i}" name="q${index}" value="${option}" ${userAnswers[`q${index}`] === option ? 'checked' : ''}>
                <label for="option${index}${i}">${option}</label>
            </div>
        `;
    });

    questionContainer.innerHTML = questionHTML;

    // Update the buttons visibility
    document.getElementById("backBtn").style.display = index > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = index < questions.length - 1 ? "inline-block" : "none";
    document.getElementById("submitBtn").style.display = index === questions.length - 1 ? "inline-block" : "none";
}

// Function to select an option
function selectOption(selectedOption) {
    // Remove 'selected' class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });

    // Add 'selected' class to the clicked option
    selectedOption.classList.add('selected');
}

// Function to go to the next question
function nextQuestion() {
    // Save the user's answer for the current question
    saveAnswer(currentQuestionIndex);

    // Move to the next question
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// Function to go to the previous question
function prevQuestion() {
    // Save the user's answer for the current question
    saveAnswer(currentQuestionIndex);

    // Move to the previous question
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
}

// Function to save the user's answer
function saveAnswer(index) {
    let selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedOption) {
        userAnswers[`q${index}`] = selectedOption.value;
    }
}

// Function to submit the quiz
function submitQuiz() {
    saveAnswer(currentQuestionIndex); // Save the answer for the last question
    alert("Quiz submitted!");

    // Hide the quiz section and show the results section
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultsSection").style.display = "block";

    // Prepare results
    let resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ''; // Clear previous results

    // Calculate and display results
    let score = 0;
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[`q${index}`];
        const isCorrect = userAnswer === question.answer;

        if (isCorrect) {
            score++;
            resultsContainer.innerHTML += `<p>Question ${index + 1}: ${question.question} <strong>Your Answer: ${userAnswer}</strong> <span style="color: green;">(Correct)</span></p>`;
        } else {
            resultsContainer.innerHTML += `<p>Question ${index + 1}: ${question.question} <strong>Your Answer: ${userAnswer}</strong> <span style="color: red;">(Incorrect, Correct Answer: ${question.answer})</span></p>`;
        }
    });

    // Display the GIF above the score
    const gifUrl = "congo.gif"; // Replace with your GIF URL
    resultsContainer.innerHTML += `<img src="${gifUrl}" alt="Quiz Result GIF" style="max-width: 100%; height: auto; margin-bottom: 20px;">`;

    // Display the total score
    resultsContainer.innerHTML += `<h2>Your Score: ${score} out of ${questions.length}</h2>`;

    console.log(`Score: ${score}, Total Questions: ${questions.length}`); // Log for debugging
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = {};
    document.getElementById("resultsSection").style.display = "none";
    document.getElementById("welcome").style.display = "block"; // Show the welcome section again
}

// Function to show the instructions section
function showInstructions() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("instructionsSection").style.display = "block";
}

// Function to show the quiz section after the instructions
function showQuizSection() {
    document.getElementById("instructionsSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
}

// Detect if the user tries to copy
document.addEventListener('copy', function() {
    alert('Copying is not allowed during the quiz.');
});

// Detect if the user switches tabs
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        alert('Switching tabs is not allowed during the quiz!');
    }
});
