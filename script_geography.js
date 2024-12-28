const geographyQuestions = [
    {
        question: "Which country has the most natural lakes in the world?",
        options: ['Canada', 'Russia', 'United States', 'Brazil'],
        correctOption: 'Canada'
    },
    {
        question: "What is the smallest independent country in the world by area?",
        options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
        correctOption: 'Vatican City'
    },
    {
        question: "Which river is known as the 'Yellow River'?",
        options: ['Yangtze River', 'Mekong River', 'Huang He River', 'Irrawaddy River'],
        correctOption: 'Huang He River'
    },
    {
        question: "Which continent has the largest desert in the world?",
        options: ['Africa', 'Antarctica', 'Asia', 'Australia'],
        correctOption: 'Antarctica'
    },
    {
        question: "Which country has the highest number of volcanoes?",
        options: ['Indonesia', 'United States', 'Japan', 'Italy'],
        correctOption: 'United States'
    },
    {
        question: "What is the capital city located at the highest altitude in the world?",
        options: ['Quito, Ecuador', 'La Paz, Bolivia', 'Thimphu, Bhutan', 'Kathmandu, Nepal'],
        correctOption: 'La Paz, Bolivia'
    },
    {
        question: "Which ocean is the deepest?",
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Southern Ocean'],
        correctOption: 'Pacific Ocean'
    },
    {
        question: "Which country is home to the world's largest coral reef system?",
        options: ['Australia', 'Indonesia', 'Philippines', 'Mexico'],
        correctOption: 'Australia'
    },
    {
        question: "What is the longest mountain range on Earth?",
        options: ['Rocky Mountains', 'Himalayas', 'Andes Mountains', 'Great Dividing Range'],
        correctOption: 'Andes Mountains'
    },
    {
        question: "Which river flows through the most countries?",
        options: ['Amazon River', 'Danube River', 'Nile River', 'Mekong River'],
        correctOption: 'Danube River'
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
    quesText.textContent = geographyQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    geographyQuestions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="q${currentQuestionIndex + 1}a${index + 1}" name="q${currentQuestionIndex + 1}" value="${option}">
            <label for="q${currentQuestionIndex + 1}a${index + 1}">${option}</label><br>
        `;
        optionsContainer.appendChild(optionElement);
    });

    if (currentQuestionIndex === geographyQuestions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}


function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

        if (selectedOption.value === geographyQuestions[currentQuestionIndex].correctOption) {
            score++;
        }

        if (currentQuestionIndex < geographyQuestions.length - 1) {
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
            <h1>Geography Quiz Results</h1>
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
