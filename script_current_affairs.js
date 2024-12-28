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

    if (currentQuestionIndex === currentAffairsQuestions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}


function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

        if (selectedOption.value === currentAffairsQuestions[currentQuestionIndex].correctOption) {
            score++;
        }

        if (currentQuestionIndex < currentAffairsQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            displayResult();
        }
    } else {
        alert('Please select an option before proceeding to the next question.');
    }
}

function displayResult() {
    document.querySelector('.quiz-category-body').innerHTML = `
        <div class="result-container">
            <h1>Current Affairs Quiz Results</h1>
            <p>Your Score: <span id="score">${score}/10</span></p>
            <p>Thank you for taking the quiz!</p>
            <a href="index.html">Back to Home</a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();

    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
});
