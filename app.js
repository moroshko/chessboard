var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var game = new Chess(fen);
var board = new ChessBoard('board', {
  fen: fen,
  resize: true,
  onSquareClick: onSquareClick
});

function onSquareClick(clickedSquare, selectedSquares) {
  if (selectedSquares.length === 0) {
    if (game.moves({ square: clickedSquare }).length > 0) {
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

  var clickedPieceObject = game.get(clickedSquare);
  var selectedPieceObject = game.get(selectedSquare);

  if (clickedPieceObject && (clickedPieceObject.color === selectedPieceObject.color)) {
    board.selectSquare(clickedSquare);
    return;
  }  

  var legalMoves = game.moves({ square: selectedSquare, verbose: true });
  var isMoveLegal = legalMoves.filter(function(move) {
    return move.to === clickedSquare;
  }).length > 0;

  if (!isMoveLegal) {
    return;
  }

  if (selectedPieceObject.type === 'p' && (clickedSquare[1] === '1' || clickedSquare[1] === '8')) { // Promotion
    board.askPromotion(selectedPieceObject.color, function(piece, shortPiece) {
      move(selectedSquare, clickedSquare, piece, shortPiece);
    });
  } else {
    move(selectedSquare, clickedSquare);
  }
}

function move(from, to, promotionPiece, promotionShortPiece) {
  var moveObject = {
    from: from,
    to: to
  };
  var boardMoveOptions = {};

  if (promotionPiece) {
    moveObject.promotion = promotionShortPiece;
    boardMoveOptions.promotion = promotionPiece;
  }

  var move = game.move(moveObject);

  if (move.flags.indexOf('e') > -1) {
    boardMoveOptions.enPassant = true;
  } else if (move.flags.indexOf('k') > -1) {
    boardMoveOptions.kingsideCastling = true;
  } else if (move.flags.indexOf('q') > -1) {
    boardMoveOptions.queensideCastling = true;
  }

  board.move(from, to, boardMoveOptions);
}
