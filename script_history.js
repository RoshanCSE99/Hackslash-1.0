const historyQuestions = [
    {
        question: 'Who was the longest-reigning monarch in world history?',
        options: ['Queen Elizabeth II (United Kingdom)', 'Louis XIV (France)', 'Emperor Akihito (Japan)', 'Emperor Franz Joseph I (Austria-Hungary)'],
        correctOption: 'Louis XIV (France)'
    },
    {
        question: 'Which ancient civilization built Machu Picchu?',
        options: ['Aztec', 'Maya', 'Inca', 'Olmec'],
        correctOption: 'Inca'
    },
    {
        question: "What was the primary cause of the Thirty Years' War?",
        options: ['Colonial disputes', 'Religious conflict', 'Territorial expansion', 'Economic crisis'],
        correctOption: 'Religious conflict'
    },
    {
        question: 'Who was the first ruler to unify most of the Indian subcontinent?',
        options: ['Chandragupta Maurya', 'Ashoka the Great', 'Akbar', 'Sher Shah Suri'],
        correctOption: 'Chandragupta Maurya'
    },
    {
        question: 'Which treaty ended World War I?',
        options: ['Treaty of Versailles', 'Treaty of Tordesillas', 'Treaty of Westphalia', 'Treaty of Ghent'],
        correctOption: 'Treaty of Versailles'
    },
    {
        question: 'Who was the first female Prime Minister in the world?',
        options: ['Indira Gandhi (India)', 'Golda Meir (Israel)', 'Sirimavo Bandaranaike (Sri Lanka)', 'Margaret Thatcher (United Kingdom)'],
        correctOption: 'Sirimavo Bandaranaike (Sri Lanka)'
    },
    {
        question: 'What was the main purpose of the Marshall Plan?',
        options: ['Rebuild Europe after World War II', 'Contain the spread of communism', 'Establish NATO', 'Fund the Cold War space race'],
        correctOption: 'Rebuild Europe after World War II'
    },
    {
        question: 'Which empire was known as the "Land of the Rising Sun"?',
        options: ['Mongol Empire', 'Japanese Empire', 'Ottoman Empire', 'Roman Empire'],
        correctOption: 'Japanese Empire'
    },
    {
        question: 'What was the name of the ship that carried the Pilgrims to America in 1620?',
        options: ['Santa Maria', 'Mayflower', 'Endeavour', 'Discovery'],
        correctOption: 'Mayflower'
    },
    {
        question: 'Who was the first Emperor of Rome?',
        options: ['Julius Caesar', 'Augustus Caesar', 'Nero', 'Tiberius'],
        correctOption: 'Augustus Caesar'
    }
];

let currentQuestionIndex = 0;
const selectedAnswers = {};
let score = 0;
let checkMode = true;

function displayQuestion() {
    const quesNumber = document.querySelector('.question-number');
    const quesText = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options-container');
    const nextButton = document.querySelector('.next-button');

    quesNumber.textContent = `${currentQuestionIndex + 1}`;
    quesText.textContent = historyQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    historyQuestions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="q${currentQuestionIndex + 1}a${index + 1}" name="q${currentQuestionIndex + 1}" value="${option}">
            <label for="q${currentQuestionIndex + 1}a${index + 1}">${option}</label><br>
        `;
        optionsContainer.appendChild(optionElement);
    });

    nextButton.textContent = 'Check';
    checkMode = true;
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    const nextButton = document.querySelector('.next-button');

    if (checkMode) {
        if (selectedOption) {
            selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

            if (selectedOption.value === historyQuestions[currentQuestionIndex].correctOption) {
                score++;
            }

            document.querySelector('.score').textContent = `Score: ${score}`;
            selectedOption.labels[0].style.color = selectedOption.value === historyQuestions[currentQuestionIndex].correctOption ? 'green' : 'red';

            historyQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (option === historyQuestions[currentQuestionIndex].correctOption) {
                    document.querySelector(`#q${currentQuestionIndex + 1}a${index + 1}`).labels[0].style.color = 'green';
                }
            });

            nextButton.textContent = currentQuestionIndex === historyQuestions.length - 1 ? 'Submit' : 'Next';
            checkMode = false;
        } else {
            alert('Please select an option before proceeding to the next question.');
        }
    } else {
        if (currentQuestionIndex < historyQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    document.querySelector('.quiz-category-body').innerHTML = `
        <div class="result-container">
            <h1>History Quiz Results</h1>
            <p>Your Score: <span id="score">${score}/10</span></p>
            <p>Thank you for taking the quiz!</p>
            <a href="index.html">Back to Home</a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score';
    scoreDisplay.textContent = `Score: ${score}`;
    document.querySelector('.quiz-category-container').prepend(scoreDisplay);

    displayQuestion();

    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
});
