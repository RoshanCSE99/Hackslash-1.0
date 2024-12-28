const inventionsQuestions = [
    {
        question: "Who is credited with inventing the first practical light bulb?",
        options: ['Nikola Tesla', 'Alessandro Volta', 'Thomas Edison', 'Michael Faraday'],
        correctOption: 'Thomas Edison'
    },
    {
        question: "Who invented the first mechanical computer, the Analytical Engine?",
        options: ['Charles Babbage', 'Alan Turing', 'John von Neumann', 'Konrad Zuse'],
        correctOption: 'Charles Babbage'
    },
    {
        question: "Who invented the first successful airplane?",
        options: ['The Wright brothers', 'Alberto Santos-Dumont', 'Leonardo da Vinci', 'Wilbur and Orville Wright'],
        correctOption: 'Wilbur and Orville Wright'
    },
    {
        question: "What year was the first mobile phone invented?",
        options: ['1970', '1980', '1983', '1990'],
        correctOption: '1983'
    },
    {
        question: "Who invented the first printing press with movable type?",
        options: ['Johannes Gutenberg', 'Leonardo da Vinci', 'Isaac Newton', 'Benjamin Franklin'],
        correctOption: 'Johannes Gutenberg'
    },
    {
        question: "Who invented the first television?",
        options: ['Philo Farnsworth', 'Guglielmo Marconi', 'Nikola Tesla', 'John Logie Baird'],
        correctOption: 'Philo Farnsworth'
    },
    {
        question: "Who invented the telephone, the first device to transmit human voice electronically?",
        options: ['Guglielmo Marconi', 'Alessandro Volta', 'Alexander Graham Bell', 'Nikola Tesla'],
        correctOption: 'Alexander Graham Bell'
    },
    {
        question: "What was the first mass-produced car, invented by Henry Ford?",
        options: ['Model A', 'Model T', 'Mustang', 'F-150'],
        correctOption: 'Model T'
    },
    {
        question: "Who invented the first successful vaccine for smallpox?",
        options: ['Louis Pasteur', 'Edward Jenner', 'Alexander Fleming', 'Joseph Lister'],
        correctOption: 'Edward Jenner'
    },
    {
        question: "Who is credited with inventing the first computer mouse?",
        options: ['Douglas Engelbart', 'Alan Turing', 'Steve Jobs', 'Bill Gates'],
        correctOption: 'Douglas Engelbart'
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
    quesText.textContent = inventionsQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    inventionsQuestions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" id="q${currentQuestionIndex + 1}a${index + 1}" name="q${currentQuestionIndex + 1}" value="${option}">
            <label for="q${currentQuestionIndex + 1}a${index + 1}">${option}</label><br>
        `;
        optionsContainer.appendChild(optionElement);
    });

    if (currentQuestionIndex === inventionsQuestions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}


function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        selectedAnswers[`q${currentQuestionIndex + 1}`] = selectedOption.value;

        if (selectedOption.value === inventionsQuestions[currentQuestionIndex].correctOption) {
            score++;
        }

        if (currentQuestionIndex < inventionsQuestions.length - 1) {
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
            <h1>Inventions Quiz Results</h1>
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
