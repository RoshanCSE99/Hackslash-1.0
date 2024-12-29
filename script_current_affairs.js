const currentAffairsQuestions = [
    {
        question: "Which country recently launched the world's first commercial modular space station?",
        options: ['China', 'United States', 'Russia', 'United Arab Emirates'],
        correctOption: 'United States'
    },
    {
        question: "Which country became the first in the world to approve the use of lab-grown meat for sale?",
        options: ['Netherlands', 'Singapore', 'United States', 'Japan'],
        correctOption: 'Singapore'
    },
    {
        question: "Who became the youngest-ever Prime Minister of Finland?",
        options: ['Sanna Marin', 'Alexander Stubb', 'Antti Rinne', 'Jyrki Katainen'],
        correctOption: 'Sanna Marin'
    },
    {
        question: "Which tech company recently achieved a $3 trillion market capitalization milestone?",
        options: ['Microsoft', 'Apple', 'Google (Alphabet)', 'Amazon'],
        correctOption: 'Apple'
    },
    {
        question: "Which country recently achieved the highest reduction in carbon emissions among G20 nations?",
        options: ['India', 'United Kingdom', 'Germany', 'Canada'],
        correctOption: 'United Kingdom'
    },
    {
        question: "Which country recently unveiled its first domestically produced fighter jet?",
        options: ['South Korea', 'India', 'Turkey', 'Indonesia'],
        correctOption: 'Turkey'
    },
    {
        question: "Which international organization recently announced its first Climate Investment Fund to combat global warming?",
        options: ['World Bank', 'International Monetary Fund (IMF)', 'United Nations (UN)', 'Asian Development Bank (ADB)'],
        correctOption: 'World Bank'
    },
    {
        question: "Who became the first female President of the European Central Bank (ECB)?",
        options: ['Christine Lagarde', 'Ursula von der Leyen', 'Angela Merkel', 'Janet Yellen'],
        correctOption: 'Christine Lagarde'
    },
    {
        question: "Which country recently launched the \"Mission LiFE\" initiative aimed at promoting sustainable living?",
        options: ['India', 'France', 'Germany', 'Japan'],
        correctOption: 'India'
    },
    {
        question: "Which African nation joined the BRICS group during its most recent expansion?",
        options: ['Ethiopia', 'Nigeria', 'South Sudan', 'Ghana'],
        correctOption: 'Ethiopia'
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
    quesText.textContent = currentAffairsQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    currentAffairsQuestions[currentQuestionIndex].options.forEach((option, index) => {
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

            if (selectedOption.value === currentAffairsQuestions[currentQuestionIndex].correctOption) {
                score++;
            }

            document.querySelector('.score').textContent = `Score: ${score}`;
            selectedOption.labels[0].style.color = selectedOption.value === currentAffairsQuestions[currentQuestionIndex].correctOption ? 'green' : 'red';

            currentAffairsQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (option === currentAffairsQuestions[currentQuestionIndex].correctOption) {
                    document.querySelector(`#q${currentQuestionIndex + 1}a${index + 1}`).labels[0].style.color = 'green';
                }
            });

            nextButton.textContent = currentQuestionIndex === currentAffairsQuestions.length - 1 ? 'Submit' : 'Next';
            checkMode = false;
        } else {
            alert('Please select an option before proceeding to the next question.');
        }
    } else {
        if (currentQuestionIndex < currentAffairsQuestions.length - 1) {
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
