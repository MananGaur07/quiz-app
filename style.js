const questions = [
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        answer: "H2O"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Mars", "Mercury", "Venus"],
        answer: "Mercury"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        answer: "Mitochondria"
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        answer: "300,000 km/s"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        answer: "Albert Einstein"
    }
];

let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const startButton = document.getElementById("start-quiz");
const quizContent = document.getElementById("quiz-content");
const questionsContainer = document.getElementById("questions-container");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const finalScoreDisplay = document.getElementById("final-score");

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    quizContent.style.display = "block";
    loadAllQuestions();
});

function loadAllQuestions() {
    questionsContainer.innerHTML = "";
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";

    questions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${q.question} (10 points)`;
        questionBox.appendChild(questionText);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        q.options.forEach((option) => {
            const optionBox = document.createElement("div");
            optionBox.classList.add("option-box");
            optionBox.textContent = option;

            optionBox.addEventListener("click", () => {
                // Deselect all options for this question
                optionsContainer.querySelectorAll(".option-box").forEach((box) => {
                    box.classList.remove("selected");
                });

                // Select the clicked option
                selectedAnswers[index] = option;
                optionBox.classList.add("selected");
            });

            // Append each option to the options container
            optionsContainer.appendChild(optionBox);
        });

        // Append the options container to the question box
        questionBox.appendChild(optionsContainer);

        // Append the question box to the main container
        questionsContainer.appendChild(questionBox);
    });
}


submitButton.addEventListener("click", () => {
    score = 0;
    questions.forEach((q, index) => {
        const optionsContainer = questionsContainer.children[index].querySelector(".options-container");
        const selectedOption = optionsContainer.querySelector(".selected");

        if (selectedOption) {
            const selectedAnswer = selectedOption.textContent;
            if (selectedAnswer === q.answer) {
                score += 10;
                selectedOption.classList.add("correct");
            } else {
                selectedOption.classList.add("incorrect");
            }
        }
    });

    scoreDisplay.textContent = `Score: ${score} / 50`;
    finalScoreDisplay.textContent = `Final Score: ${score} / 50`;
    finalScoreDisplay.style.display = "block";
    resetButton.style.display = "block";
    generateConfetti();
});

resetButton.addEventListener("click", () => {
    score = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    scoreDisplay.textContent = "Score: 0 / 50";
    loadAllQuestions();
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";
    startButton.style.display = "block";
    quizContent.style.display = "none";
});

function generateConfetti() {
    const confettiContainer = document.createElement("div");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const size = Math.random() * 10 + 5;
        const color = "#64ffda"; /* Teal confetti */
        const startPositionX = Math.random() * window.innerWidth;
        const startPositionY = Math.random() * window.innerHeight;

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${startPositionX}px`;
        confetti.style.top = `${startPositionY}px`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}