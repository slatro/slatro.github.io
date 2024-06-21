body {
    font-family: Arial, sans-serif;
    background: url('background.jpg') no-repeat center center fixed;
    background-size: cover;
    color: #fff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: auto;
}

.container {
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
}

.game-setup, .game-dashboard, .game-board, .results {
    margin: 20px 0;
}

label, select, button, input {
    margin: 5px;
    padding: 10px;
}

button {
    background-color: #28a745;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #6c757d;
}

button:hover:enabled {
    background-color: #218838;
}

.players-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.players-list div {
    background: rgba(255, 255, 255, 0.2);
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
}

.category {
    font-size: 24px;
    margin-bottom: 10px;
}

#category-input {
    padding: 10px;
    width: 80%;
}

.results-list div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
}

.tick, .cross {
    margin-left: 10px;
    cursor: pointer;
}
