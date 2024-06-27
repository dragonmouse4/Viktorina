const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const questionCounter = document.getElementById("question-counter");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
  },
  {
    "question": "What is the capital of France?",
    "answers": [
      { "text": "London", "correct": false },
      { "text": "Berlin", "correct": false },
      { "text": "Paris", "correct": true },
      { "text": "Madrid", "correct": false }
    ]
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "answers": [
      { "text": "Venus", "correct": false },
      { "text": "Jupiter", "correct": false },
      { "text": "Saturn", "correct": false },
      { "text": "Mars", "correct": true }
    ]
  },
  {
    "question": "What is the largest ocean on Earth?",
    "answers": [
      { "text": "Pacific Ocean", "correct": true },
      { "text": "Atlantic Ocean", "correct": false },
      { "text": "Indian Ocean", "correct": false },
      { "text": "Arctic Ocean", "correct": false }
    ]
  },
  {
    "question": "Who wrote 'To Kill a Mockingbird'?",
    "answers": [
      { "text": "Harper Lee", "correct": true },
      { "text": "Mark Twain", "correct": false },
      { "text": "Ernest Hemingway", "correct": false },
      { "text": "F. Scott Fitzgerald", "correct": false }
    ]
  },
  {
    "question": "What is the smallest unit of matter?",
    "answers": [
      { "text": "Molecule", "correct": false },
      { "text": "Electron", "correct": false },
      { "text": "Proton", "correct": false },
      { "text": "Atom", "correct": true }
    ]
  },
  {
    "question": "Who painted the Mona Lisa?",
    "answers": [
      { "text": "Vincent van Gogh", "correct": false },
      { "text": "Leonardo da Vinci", "correct": true },
      { "text": "Pablo Picasso", "correct": false },
      { "text": "Claude Monet", "correct": false }
    ]
  },
  {
    "question": "What is the powerhouse of the cell?",
    "answers": [
      { "text": "Nucleus", "correct": false },
      { "text": "Ribosome", "correct": false },
      { "text": "Mitochondria", "correct": true },
      { "text": "Endoplasmic Reticulum", "correct": false }
    ]
  },
  {
    "question": "Which element has the chemical symbol 'O'?",
    "answers": [
      { "text": "Osmium", "correct": false },
      { "text": "Gold", "correct": false },
      { "text": "Oxygen", "correct": true },
      { "text": "Oxide", "correct": false }
    ]
  },
  {
    "question": "What is the capital city of Japan?",
    "answers": [
      { "text": "Kyoto", "correct": false },
      { "text": "Tokyo", "correct": true },
      { "text": "Osaka", "correct": false },
      { "text": "Nagoya", "correct": false }
    ]
  },
  {
    "question": "In which year did the Titanic sink?",
    "answers": [
      { "text": "1905", "correct": false },
      { "text": "1912", "correct": true },
      { "text": "1918", "correct": false },
      { "text": "1920", "correct": false }
    ]
  }
  
  
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  nextButton.disabled = false;
  nextButton.innerText = "Next";
  nextButton.style.backgroundColor = "";
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  updateQuestionCounter();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function updateQuestionCounter() {
  questionCounter.innerText = `Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    nextButton.disabled = true; // Disable  Next 
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
      nextButton.innerText = "Correct!";
      nextButton.style.backgroundColor = "green";
    } else {
      nextButton.innerText = "Incorrect";
      nextButton.style.backgroundColor = "red";
    }
    currentQuestionIndex++;
    setTimeout(() => {
      if (shuffledQuestions.length > currentQuestionIndex) {
        setNextQuestion();
      } else {
        endQuiz();
      }
      nextButton.disabled = false; // Enable Next 
      nextButton.innerText = "Next";
      nextButton.style.backgroundColor = ""; 
    }, 1000); // Delay
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}

// blobs
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function updateBlobColors() {
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach(blob => {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        blob.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
    });
}

setInterval(updateBlobColors, 2000);
