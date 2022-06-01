const gameBoard = (() => {
  const gameBoard = ['', 'x', '', '', '', '', '', '', ''];
  const boxes = document.querySelectorAll('.box');

  const createDisplay = () => {
    for (let i = 0; i < 9; i++) {
      boxes[i].textContent = gameBoard[i];
    }
  };

  return {
    createDisplay,
  };
})();

const displayController = (() => {
  const displayBoxes = () => {
    console.log(boxes);
  };

  return {
    displayBoxes,
  };
})();
