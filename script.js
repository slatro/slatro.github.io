document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game');
    const beginGameBtn = document.getElementById('begin-game');
    const submitAnswerBtn = document.getElementById('submit-answer');
    const playersList = document.getElementById('players-list');
    const gameDashboard = document.getElementById('game-dashboard');
    const gameBoard = document.getElementById('game-board');
    const resultsDiv = document.getElementById('results');
    const resultsList = document.getElementById('results-list');
    const categoriesDiv = document.getElementById('categories');
    const gameLetterDiv = document.getElementById('game-letter');
    const gameLink = document.getElementById('game-link');
    const gameSetup = document.getElementById('game-setup');

    const categories = ['İsim', 'Şehir', 'Eşya', 'Bitki', 'Ünlü', 'Hayvan', 'Meslek', 'Ülke', '8 Harfli Kelime', 'Araba Markası', 'İlçe', 'Yabancı Şehir'];
    const turkishAlphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
    let players = [];
    let currentLetter = '';
    let timer;
    let answers = [];
    let gameID = '';
    let gameOwner = false;
    let maxPlayers = 0;

    startGameBtn.addEventListener('click', () => {
        const timeSelect = document.getElementById('time-select').value;
        const playerSelect = document.getElementById('player-select').value;
        gameID = generateUUID();
        gameOwner = true;
        maxPlayers = parseInt(playerSelect);
        setupGame(parseInt(timeSelect), maxPlayers);
        localStorage.setItem('gameID', gameID);
        localStorage.setItem('maxPlayers', maxPlayers);
        localStorage.setItem('gameOwner', 'true');
        localStorage.setItem('players', JSON.stringify([{ name: 'Player 1', ready: true }]));
        // Redirect to the game link
        window.location.href = `${window.location.origin}${window.location.pathname}?game=${gameID}`;
    });

    beginGameBtn.addEventListener('click', () => {
        const playerIndex = players.findIndex(player => player.name === getPlayerName());
        if (playerIndex !== -1) {
            players[playerIndex].ready = true;
            updatePlayersList();
            if (players.every(player => player.ready)) {
                startRound();
            }
        }
    });

    submitAnswerBtn.addEventListener('click', () => {
        const answerInputs = document.querySelectorAll('.category-input');
        answerInputs.forEach(input => {
            const answer = input.value.trim();
            if (answer) {
                answers.push({ player: getPlayerName(), category: input.dataset.category, answer });
                input.value = '';
            }
        });
        displayResults();
    });

    function setupGame(time, playerCount) {
        players = [{ name: 'Player 1', ready: true }];
        updatePlayersList();
        gameSetup.style.display = 'none';
        gameDashboard.style.display = 'block';
        gameLink.textContent = `Oyuna katılmak için bu linki paylaşın: ${window.location.origin}${window.location.pathname}?game=${gameID}`;
        gameBoard.style.display = 'none';
        resultsDiv.style.display = 'none';
        beginGameBtn.disabled = players.some(player => !player.ready);
    }

    function updatePlayersList() {
        playersList.innerHTML = players.map(player => `
            <div>${player.name} ${player.ready ? '✔️' : ''}</div>
        `).join('');
        beginGameBtn.disabled = players.some(player => !player.ready);
        localStorage.setItem('players', JSON.stringify(players));
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

    function getPlayerName() {
        const gameOwnerFlag = localStorage
