const spaceQuestions = [
    {
        question: "What is the most massive known star?",
        options: ['Betelgeuse', 'VY Canis Majoris', 'UY Scuti', 'WOH G64'],
        correctOption: 'WOH G64'
    },
    {
        question: "Which space probe was the first to reach interstellar space?",
        options: ['Voyager 1', 'Voyager 2', 'Parker Solar Probe', 'New Horizons'],
        correctOption: 'Voyager 1'
    },
    {
        question: "What is the largest moon of Saturn?",
        options: ['Enceladus', 'Titan', 'Rhea', 'Mimas'],
        correctOption: 'Titan'
    },
    {
        question: "Who was the first human to travel into space?",
        options: ['Neil Armstrong', 'Yuri Gagarin', 'Buzz Aldrin', 'John Glenn'],
        correctOption: 'Yuri Gagarin'
    },
    {
        question: "What is the name of the largest galaxy known to humanity?",
        options: ['Andromeda Galaxy', 'Milky Way Galaxy', 'IC 1101', 'Whirlpool Galaxy'],
        correctOption: 'IC 1101'
    },
    {
        question: "What is the term used to describe a black hole’s boundary, beyond which nothing can escape?",
        options: ['Event Horizon', 'Singularity', 'Accretion Disk', 'Photon Sphere'],
        correctOption: 'Event Horizon'
    },
    {
        question: "Which planet has the longest day of any planet in the solar system?",
        options: ['Earth', 'Venus', 'Jupiter', 'Uranus'],
        correctOption: 'Venus'
    },
    {
        question: "What is the closest galaxy to the Milky Way?",
        options: ['Andromeda Galaxy', 'Sagittarius Dwarf Elliptical Galaxy', 'Triangulum Galaxy', 'The Large Magellanic Cloud'],
        correctOption: 'The Large Magellanic Cloud'
    },
    {
        question: "Which element is most abundant in the Sun’s atmosphere?",
        options: ['Oxygen', 'Hydrogen', 'Carbon', 'Helium'],
        correctOption: 'Hydrogen'
    },
    {
        question: "Which spacecraft was the first to land on a comet?",
        options: ['Vega 1', 'Rosetta', 'Parker Solar Probe', 'Spirit Rover'],
        correctOption: 'Rosetta'
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
    quesText.textContent = spaceQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    spaceQuestions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="q${currentQuestionIndex + 1}a${index + 1}" name="q${currentQuestionIndex + 1}" value="${option}">
            <label for="q${currentQuestionIndex + 1}a${index + 1}">${option}</label><br>
        `;
        optionsContainer.appendChild(optionElement);
    });

    if (currentQuestionIndex === spaceQuestions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}


function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

        if (selectedOption.value === spaceQuestions[currentQuestionIndex].correctOption) {
            score++;
        }

        if (currentQuestionIndex < spaceQuestions.length - 1) {
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
            <h1>History Quiz Results</h1>
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
