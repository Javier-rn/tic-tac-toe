const gameBoard = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  const newGameBtn = document.querySelector('#new-game');
  const boxes = document.querySelectorAll('.box');

  const createDisplay = () => {
    for (let i = 0; i < 9; i++) {
      boxes[i].textContent = gameBoard[i];
    }
  };

  const clearGameboard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = '';
    }
    createDisplay();
  };

  newGameBtn.addEventListener('click', function () {
    game.startGame();
  });

  return {
    gameBoard,
    createDisplay,
    clearGameboard,
  };
})();

function Player(name, marker) {
  let score = 0;
  let current = true;
  return { name, marker, score, current };
}

const game = (() => {
  const boxes = document.querySelectorAll('.box');
  const p1NameDisplay = document.querySelector('#p1-name');
  const p2NameDisplay = document.querySelector('#p2-name');
  const p1ScoreDisplay = document.querySelector('#p1-score');
  const p2ScoreDisplay = document.querySelector('#p2-score');
  const p1TurnDisplay = document.querySelector('#p1-turn');
  const p2TurnDisplay = document.querySelector('#p2-turn');

  function startGame() {
    const player1 = Player(prompt('Player 1 name: '), 'x');
    const player2 = Player(prompt('Player 2 name: '), 'o');

    player1.score = 0;
    p1ScoreDisplay.textContent = player1.score;

    player2.score = 0;
    p2ScoreDisplay.textContent = player2.score;

    p1NameDisplay.textContent = player1.name;
    p2NameDisplay.textContent = player2.name;

    p1TurnDisplay.classList.toggle('invisible');

    boxes.forEach((box) => {
      box.addEventListener('click', function (e) {
        if (player1.current === true) {
          gameBoard.gameBoard[e.target.id] = player1.marker;
          if (checkWinner(gameBoard.gameBoard)) {
            player1.score++;

            p1ScoreDisplay.textContent = player1.score;
            setTimeout(() => {
              gameBoard.clearGameboard();
              player1.current = false;
              player2.current = true;
              p1TurnDisplay.classList.toggle('invisible');
              p2TurnDisplay.classList.toggle('invisible');
            }, 800);
          } else {
            if (checkFullGameboard(gameBoard.gameBoard) === true) {
              setTimeout(() => {
                console.log('Gameboard full, restarting game');
                gameBoard.clearGameboard();
              }, 800);
            }
            player1.current = false;
            player2.current = true;
            p1TurnDisplay.classList.toggle('invisible');
            p2TurnDisplay.classList.toggle('invisible');
          }
        } else if (player2.current === true) {
          gameBoard.gameBoard[e.target.id] = player2.marker;
          if (checkWinner(gameBoard.gameBoard)) {
            player2.score++;

            p2ScoreDisplay.textContent = player2.score;

            setTimeout(() => {
              gameBoard.clearGameboard();
              player1.current = true;
              player2.current = false;
              p1TurnDisplay.classList.toggle('invisible');
              p2TurnDisplay.classList.toggle('invisible');
            }, 800);
          } else {
            if (checkFullGameboard(gameBoard.gameBoard) === true) {
              setTimeout(() => {
                console.log('Gameboard full, restarting game');
                gameBoard.clearGameboard();
              }, 800);
            }
            player1.current = true;
            player2.current = false;
            p1TurnDisplay.classList.toggle('invisible');
            p2TurnDisplay.classList.toggle('invisible');
          }
        }
        gameBoard.createDisplay();
      });
    });
  }

  function checkWinner(gameBoard) {
    let win = false;
    const winnercombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];

    winnercombinations.forEach((combination) => {
      let checkArray = [];
      combination.forEach((num) => {
        checkArray.push(gameBoard[num - 1]);
      });

      if (checkArray.includes('')) {
      } else if (checkArray.every((value) => value === checkArray[0])) {
        win = true;
      }
    });

    return win;
  }

  function checkFullGameboard(gameBoard) {
    let full = true;
    const emptyValue = '';
    gameBoard.forEach((value) => {
      if (value === emptyValue) {
        full = false;
      }
    });
    return full;
  }

  return {
    startGame,
  };
})();
