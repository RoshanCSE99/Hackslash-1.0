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
let checkMode = true;

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

    nextButton.textContent = 'Check';
    checkMode = true;
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    const nextButton = document.querySelector('.next-button');

    if (checkMode) {
        if (selectedOption) {
            selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

            if (selectedOption.value === geographyQuestions[currentQuestionIndex].correctOption) {
                score++;
            }

            document.querySelector('.score').textContent = `Score: ${score}`;
            selectedOption.labels[0].style.color = selectedOption.value === geographyQuestions[currentQuestionIndex].correctOption ? 'green' : 'red';

            geographyQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (option === geographyQuestions[currentQuestionIndex].correctOption) {
                    document.querySelector(`#q${currentQuestionIndex + 1}a${index + 1}`).labels[0].style.color = 'green';
                }
            });

            nextButton.textContent = currentQuestionIndex === geographyQuestions.length - 1 ? 'Submit' : 'Next';
            checkMode = false;
        } else {
            alert('Please select an option before proceeding to the next question.');
        }
    } else {
        if (currentQuestionIndex < geographyQuestions.length - 1) {
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
