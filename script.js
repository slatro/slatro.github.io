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
    let gameID = '';

    startGameBtn.addEventListener('click', () => {
        const timeSelect = document.getElementById('time-select').value;
        const playerSelect = document.getElementById('player-select').value;
        gameID = generateUUID();
        setupGame(parseInt(timeSelect), parseInt(playerSelect));
    });

    beginGameBtn.addEventListener('click', () => {
        if (players.length > 0 && players.every(player => player.ready)) {
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
        players = Array.from({ length: playerCount }, (_, i) => ({ name: `Player ${i + 1}`, ready: false }));
        playersList.innerHTML = players.map(player => `<div>${player.name}</div>`).join('');
        gameDashboard.style.display = 'block';
        gameLink.textContent = `Oyuna katılmak için bu linki paylaşın: ${window.location.href}?game=${gameID}`;
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
        resultsList.innerHTML = answers.map(a => `
            <div>
                <div>${a.player} (${a.category}): ${a.answer}</div>
                <div>
                    <span class="tick">✔️</span>
                    <span class="cross">❌</span>
                </div>
            </div>
        `).join('');

        // Automatically set ticks and crosses based on answers
        const answerDivs = resultsList.querySelectorAll('div');
        answerDivs.forEach(div => {
            const answerText = div.querySelector('div').textContent.split(': ')[1];
            const cross = div.querySelector('.cross');
            const tick = div.querySelector('.tick');

            if (!answerText || answerText.length <= 1) {
                cross.classList.add('active');
            } else {
                tick.classList.add('active');
            }

            tick.addEventListener('click', () => {
                tick.classList.add('active');
                cross.classList.remove('active');
            });

            cross.addEventListener('click', () => {
                cross.classList.add('active');
                tick.classList.remove('active');
            });
        });
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});
