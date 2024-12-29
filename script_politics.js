const politicsQuestions = [
    {
        question: "Which treaty established the European Union (EU)?",
        options: ['Treaty of Lisbon', 'Treaty of Maastricht', 'Treaty of Rome', 'Treaty of Versailles'],
        correctOption: 'Treaty of Maastricht'
    },
    {
        question: "Who was the first President of the United Nations General Assembly?",
        options: ['Dag Hammarskjöld', 'Paul-Henri Spaak', 'Trygve Lie', 'Carlos P. Romulo'],
        correctOption: 'Paul-Henri Spaak'
    },
    {
        question: "Which country has the world's oldest written constitution still in use?",
        options: ['United States', 'United Kingdom', 'Switzerland', 'France'],
        correctOption: 'United States'
    },
    {
        question: "What political doctrine was primarily responsible for the Cold War division between the East and West?",
        options: ['Capitalism vs. Communism', 'Fascism vs. Socialism', 'Monarchy vs. Democracy', 'Isolationism vs. Globalism'],
        correctOption: 'Capitalism vs. Communism'
    },
    {
        question: "Which political philosopher wrote 'The Social Contract'?",
        options: ['John Locke', 'Thomas Hobbes', 'Jean-Jacques Rousseau', 'Baron de Montesquieu'],
        correctOption: 'Jean-Jacques Rousseau'
    },
    {
        question: "Which U.S. President introduced the New Deal?",
        options: ['Woodrow Wilson', 'Franklin D. Roosevelt', 'Theodore Roosevelt', 'Harry S. Truman'],
        correctOption: 'Franklin D. Roosevelt'
    },
    {
        question: "What was the primary purpose of the Bandung Conference of 1955?",
        options: ['Create the Non-Aligned Movement', 'Foster African-Asian solidarity', 'Condemn colonialism', 'All of the above'],
        correctOption: 'All of the above'
    },
    {
        question: "Who was the longest-serving Prime Minister of the United Kingdom?",
        options: ['Margaret Thatcher', 'Sir Robert Walpole', 'Winston Churchill', 'Tony Blair'],
        correctOption: 'Sir Robert Walpole'
    },
    {
        question: "What is the primary function of the International Criminal Court (ICC)?",
        options: ['Adjudicate state disputes', 'Prosecute individuals for crimes like genocide and war crimes', 'Resolve trade disputes', 'Enforce United Nations resolutions'],
        correctOption: 'Prosecute individuals for crimes like genocide and war crimes'
    },
    {
        question: "Which African country was never colonized by European powers?",
        options: ['Liberia', 'Ethiopia', 'Botswana', 'Ghana'],
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
    quesText.textContent = politicsQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    politicsQuestions[currentQuestionIndex].options.forEach((option, index) => {
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

            if (selectedOption.value === politicsQuestions[currentQuestionIndex].correctOption) {
                score++;
            }

            document.querySelector('.score').textContent = `Score: ${score}`;
            selectedOption.labels[0].style.color = selectedOption.value === politicsQuestions[currentQuestionIndex].correctOption ? 'green' : 'red';

            politicsQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (option === politicsQuestions[currentQuestionIndex].correctOption) {
                    document.querySelector(`#q${currentQuestionIndex + 1}a${index + 1}`).labels[0].style.color = 'green';
                }
            });

            nextButton.textContent = currentQuestionIndex === politicsQuestions.length - 1 ? 'Submit' : 'Next';
            checkMode = false;
        } else {
            alert('Please select an option before proceeding to the next question.');
        }
    } else {
        if (currentQuestionIndex < politicsQuestions.length - 1) {
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
