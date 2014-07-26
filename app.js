var board = new ChessBoard('board', {
  fen: 'rnbqnbrr/ppp2ppp/5n2/3Pk3/2P1P3/8/PP2N2P/RNBQ1RK1 w - - 0 1',
  resize: false,
  onSquareClick: onSquareClick
});

function onSquareClick(clickedSquare, clickedPiece, selectedSquares) {
  if (selectedSquares.length === 0) {
    if (clickedPiece !== null) {
      board.selectSquare(clickedSquare);
    }
    
    return;
  }

  var selectedSquare = selectedSquares[0];
   
  if (clickedSquare === selectedSquare) {
    board.unselectSquare(clickedSquare);
    return;
  }

  board.unselectSquare(selectedSquare);
  board.move(selectedSquare, clickedSquare);
}
