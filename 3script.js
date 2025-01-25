let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from API
fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        displayQuestion();
    });

// Display the current question and choices
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';
    document.getElementById('next').style.display = 'none';

    const answers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswer(button, questionData.correct_answer));
        choicesElement.appendChild(button);
    });
}

// Handle the user's answer
function handleAnswer(button, correctAnswer) {
    const buttons = document.querySelectorAll('#choices button');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
    });

    if (button.textContent !== correctAnswer) {
        button.classList.add('wrong');
    } else {
        score++;
    }

    document.getElementById('next').style.display = 'block';
}

// Proceed to the next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Display the final score
function showScore() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-container').textContent = `You scored ${score}/${questions.length}`;
}
