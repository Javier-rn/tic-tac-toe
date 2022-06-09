const gameBoard = (() => {
  const gameBoard = ['x', 'o', 'x', 'o', '1', 'x', '1', 'o', 'o'];

  const boxes = document.querySelectorAll('.box');

  const createDisplay = () => {
    for (let i = 0; i < 9; i++) {
      boxes[i].textContent = gameBoard[i];
    }
  };

  return {
    gameBoard,
    createDisplay,
  };
})();

function Player(name, marker) {
  let score = 0;
  let current = true;
  return { name, marker, score, current };
}

const game = (() => {
  const player1 = Player('Player 1', 'x');
  const player2 = Player('Player 2', 'o');
  const boxes = document.querySelectorAll('.box');

  let currentPlayer = player1;

  boxes.forEach((box) => {
    box.addEventListener('click', function (e) {
      if (player1.current === true) {
        gameBoard.gameBoard[e.target.id] = player1.marker;
        player1.current = false;
        player2.current = true;
      } else if (player2.current === true) {
        gameBoard.gameBoard[e.target.id] = player2.marker;
        player1.current = true;
        player2.current = false;
      }
      gameBoard.createDisplay();
    });
  });

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
      console.log(checkArray);

      if (checkArray.every((value) => value === checkArray[0])) {
        win = true;
      }
    });

    return win;
  }

  return {
    checkWinner,
  };
})();
