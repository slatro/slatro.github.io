let players = [];
let currentQuestionIndex = 0;
let timeLeft;
let timerInterval;
const categories = ["İsim", "Şehir", "Eşya", "Bitki", "Ünlü", "Hayvan", "Meslek", "Ülke", "8 Harfli Kelime", "Araba Markası", "İlçe", "Yabancı Şehir"];
const maxRounds = 10;

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    const timeLimit = parseInt(document.getElementById('time-select').value);
    
    for (let i = 0; i < playerCount; i++) {
        players.push({
            name: `Oyuncu ${i + 1}`,
            emoji: getRandomEmoji(),
            answers: [],
            score: 0
        });
    }
    
    document.getElementById('game-settings').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    startRound();
    startTimer(timeLimit);
}

function startRound() {
    if (currentQuestionIndex >= maxRounds) {
        showResults();
        return;
    }
    
    const questionSection = document.getElementById('question-section');
    questionSection.innerHTML = '';
    
    categories.forEach(category => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<label for="${category}">${category}: </label><input type="text" id="${category}">`;
        questionSection.appendChild(questionDiv);
    });
    
    currentQuestionIndex++;
}

function startTimer(seconds) {
    timeLeft = seconds;
    document.getElementById('time-left').innerText = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            evaluateAnswers();
        }
    }, 1000);
}

function evaluateAnswers() {
    // Cevapları değerlendirme ve puanlama işlemi burada yapılacak
    
    startRound();
}

function showResults() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    // Sonuçları gösterme işlemi burada yapılacak
}

function getRandomEmoji() {
    const emojis = ["😊", "😂", "😍", "😎", "🤔"];
    return emojis[Math.floor(Math.random() * emojis.length)];
}
