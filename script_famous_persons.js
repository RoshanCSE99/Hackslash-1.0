const famousPersonsQuestions = [
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ['Marie Curie', 'Dorothy Crowfoot Hodgkin', 'Rosalind Franklin', 'Mother Teresa'],
        correctOption: 'Marie Curie'
    },
    {
        question: "Who was the first person to set foot on the moon?",
        options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'John Glenn'],
        correctOption: 'Neil Armstrong'
    },
    {
        question: "Who was the author of the book 'The Origin of Species'?",
        options: ['Charles Darwin', 'Isaac Newton', 'Albert Einstein', 'Louis Pasteur'],
        correctOption: 'Charles Darwin'
    },
    {
        question: "Who is credited with inventing the telephone?",
        options: ['Nikola Tesla', 'Guglielmo Marconi', 'Thomas Edison', 'Alexander Graham Bell'],
        correctOption: 'Alexander Graham Bell'
    },
    {
        question: "Who was the first African-American woman to win a Nobel Prize in Literature?",
        options: ['Maya Angelou', 'Toni Morrison', 'Zora Neale Hurston', 'Alice Walker'],
        correctOption: 'Toni Morrison'
    },
    {
        question: "Who was the first emperor of the Roman Empire?",
        options: ['Julius Caesar', 'Nero', 'Augustus Caesar', 'Constantine the Great'],
        correctOption: 'Augustus Caesar'
    },
    {
        question: "Who developed the theory of relativity?",
        options: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Nikola Tesla'],
        correctOption: 'Albert Einstein'
    },
    {
        question: "Who was the first female Prime Minister of the United Kingdom?",
        options: ['Golda Meir', 'Indira Gandhi', 'Margaret Thatcher', 'Sirimavo Bandaranaike'],
        correctOption: 'Margaret Thatcher'
    },
    {
        question: "Who is regarded as the father of modern chemistry?",
        options: ['Albert Einstein', 'Dmitri Mendeleev', 'Marie Curie', 'Antoine Lavoisier'],
        correctOption: 'Antoine Lavoisier'
    },
    {
        question: "Who was the leader of the Indian independence movement and is known as the 'Father of the Nation'?",
        options: ['Jawaharlal Nehru', 'Bhimrao Ambedkar', 'Mahatma Gandhi', 'Subhas Chandra Bose'],
        correctOption: 'Mahatma Gandhi'
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
    quesText.textContent = famousPersonsQuestions[currentQuestionIndex].question;

    optionsContainer.innerHTML = '';

    famousPersonsQuestions[currentQuestionIndex].options.forEach((option, index) => {
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

            if (selectedOption.value === famousPersonsQuestions[currentQuestionIndex].correctOption) {
                score++;
            }

            document.querySelector('.score').textContent = `Score: ${score}`;
            selectedOption.labels[0].style.color = selectedOption.value === famousPersonsQuestions[currentQuestionIndex].correctOption ? 'green' : 'red';

            famousPersonsQuestions[currentQuestionIndex].options.forEach((option, index) => {
                if (option === famousPersonsQuestions[currentQuestionIndex].correctOption) {
                    document.querySelector(`#q${currentQuestionIndex + 1}a${index + 1}`).labels[0].style.color = 'green';
                }
            });

            nextButton.textContent = currentQuestionIndex === famousPersonsQuestions.length - 1 ? 'Submit' : 'Next';
            checkMode = false;
        } else {
            alert('Please select an option before proceeding to the next question.');
        }
    } else {
        if (currentQuestionIndex < famousPersonsQuestions.length - 1) {
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
