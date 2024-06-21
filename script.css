document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game');
    const beginGameBtn = document.getElementById('begin-game');
    const submitAnswerBtn = document.getElementById('submit-answer');
    const playersList = document.getElementById('players-list');
    const gameDashboard = document.querySelector('.game-dashboard');
    const gameBoard = document.querySelector('.game-board');
    const resultsDiv = document.querySelector('.results');
    const resultsList = document.getElementById('results-list');
    const categoriesDiv = document.getElementById('categories');
    const gameLetterDiv = document.getElementById('game-letter');
    const gameLink = document.getElementById('game-link');
    
    const categories = ['İsim', 'Şehir', 'Eşya', 'Bitki', 'Ünlü', 'Hayvan', 'Meslek', 'Ülke', '8 Harfli Kelime', 'Araba Markası', 'İlçe', 'Yabancı Şehir'];
    const turkishAlphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
    let players = [];
    let currentLetter = '';
    let timer;
    let answers = [];

    startGameBtn.addEventListener('click', () => {
        const timeSelect = document.getElementById('time-select').value;
        const playerSelect = document.getElementById('player-select').value;
        setupGame(parseInt(timeSelect), parseInt(playerSelect));
    });

    beginGameBtn.addEventListener('click', () => {
        if (players.length > 0) {
            startRound();
        }
    });

    submitAnswerBtn.addEventListener('click', () => {
        const answerInputs = document.querySelectorAll('.category-input');
        answerInputs.forEach(input => {
            const answer = input.value.trim();
            if (answer) {
                answers.push({ player: 'Me', category: input.dataset.category, answer });
                input.value = '';
            }
        });
        displayResults();
    });

    function setupGame(time, playerCount) {
        players = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
        playersList.innerHTML = players.map(player => `<div>${player}</div>`).join('');
        gameDashboard.style.display = 'block';
        gameLink.textContent = 'Oyuna katılmak için bu linki paylaşın: ' + window.location.href;
        gameBoard.style.display = 'none';
        resultsDiv.style.display = 'none';
    }

    function startRound() {
        gameDashboard.style.display = 'none';
        gameBoard.style.display = 'block';
        resultsDiv.style.display = 'none';
        currentLetter = turkishAlphabet[Math.floor(Math.random() * turkishAlphabet.length)];
        gameLetterDiv.textContent = `Başlangıç Harfi: ${currentLetter}`;
        categoriesDiv.innerHTML = categories.map(category => `
            <div>
                <div class="category">${category}</div>
                <input type="text" class="category-input" data-category="${category}">
            </div>
        `).join('');
        startTimer();
    }

    function startTimer() {
        clearInterval(timer);
        let time = 100; // Example time for a round, change as needed
        timer = setInterval(() => {
            if (time > 0) {
                time--;
            } else {
                clearInterval(timer);
                displayResults();
            }
        }, 1000);
    }

    function displayResults() {
        gameBoard.style.display = 'none';
        resultsDiv.style.display = 'block';
        resultsList.innerHTML = answers.map(a => `<div>${a.player} (${a.category}): ${a.answer}</div>`).join('');
    }
});
