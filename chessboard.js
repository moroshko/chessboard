window.ChessBoard = function(boardId, config) {
  var self = this;

  var options = {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    resize: true
  };

  for (var key in config) {
    options[key] = config[key];
  }

  var maxSquareSize = 64;
  var boardBorderWidth, squareSize, boardWidthFix, selectedSquares = [];
  var board = {};

  function calcSquare(row, column) {
    return String.fromCharCode(97 + column) + row;
  }

  function createBoard() {
    var boardElement = document.getElementById(boardId);

    boardElement.classList.add('chessboard');
    board.element = boardElement;

    for (var r = 8; r >= 1; r--) {
      var rowElement = document.createElement('div');

      board[r] = {
        element: rowElement
      };

      for (var c = 0; c < 8; c++) {
        var squareElement = document.createElement('div');
        
        if ((r + c) % 2 === 0) {
          squareElement.className = 'white square';
        } else {
          squareElement.className = 'black square';
        }

        squareElement.setAttribute('data-square', calcSquare(r, c));

        if (options.onSquareClick) {
          squareElement.addEventListener('click', onSquareClick);
        }

        board[r][c] = {
          element: squareElement,
          piece: null
        };
        
        rowElement.appendChild(squareElement);
      }

      boardElement.appendChild(rowElement);
    }
  }

  function calcSquareSize() {
    var parentStyle = getComputedStyle(board.element.parentNode);
    var parentWidth = parseInt(parentStyle.width) - parseInt(parentStyle.paddingLeft) 
                                                  - parseInt(parentStyle.paddingRight);
    
    squareSize = Math.min(Math.floor((parentWidth - 2 * boardBorderWidth) / 8), maxSquareSize);
  }

  function setBoardSize() {
    calcSquareSize();

    var squareSizePx = squareSize + 'px';
    var rowWidthPx = (8 * squareSize) + 'px';
    var backgroundSizePx = (6 * squareSize) + 'px';

    board.element.style.width = (8 * squareSize) + boardWidthFix + 'px';

    for (var r = 8; r >= 1; r--) {
      board[r].element.style.width = rowWidthPx;
      board[r].element.style.height = squareSizePx;

      for (var c = 0; c < 8; c++) {
        board[r][c].element.style.width = squareSizePx;
        board[r][c].element.style.height = squareSizePx;
        board[r][c].element.style.backgroundSize = backgroundSizePx;
        board[r][c].element.style.backgroundPosition = backgroundPosition(board[r][c].piece);
      }
    }
  }

  function backgroundPosition(piece) {
    switch (piece) {
      case 'wP': return '0 0';
      case 'wB': return -1 * squareSize + 'px 0';
      case 'wN': return -2 * squareSize + 'px 0';
      case 'wR': return -3 * squareSize + 'px 0';
      case 'wQ': return -4 * squareSize + 'px 0';
      case 'wK': return -5 * squareSize + 'px 0';
      case 'bP': return '0 ' + -1 * squareSize + 'px';
      case 'bB': return -1 * squareSize + 'px ' + -1 * squareSize + 'px';
      case 'bN': return -2 * squareSize + 'px ' + -1 * squareSize + 'px';
      case 'bR': return -3 * squareSize + 'px ' + -1 * squareSize + 'px';
      case 'bQ': return -4 * squareSize + 'px ' + -1 * squareSize + 'px';
      case 'bK': return -5 * squareSize + 'px ' + -1 * squareSize + 'px';
    }
  }

  function getBoardSquare(square) {
    var c = square[0].charCodeAt(0) - 97;
    var r = +square[1];

    return board[r][c];
  }

  this.selectSquare = function(square) {
    if (selectedSquares.indexOf(square) > -1) {
      return;
    }

    var boardSquare = getBoardSquare(square);

    boardSquare.element.classList.add('selected');
    selectedSquares.push(square);
  };

  this.unselectSquare = function(square) {
    var index = selectedSquares.indexOf(square);

    if (index === -1) {
      return;
    }

    var boardSquare = getBoardSquare(square);

    boardSquare.element.classList.remove('selected');
    selectedSquares.splice(index, 1);
  };

  function onSquareClick(event) {
    var clickedSquare = event.target.getAttribute('data-square');
    var clickedPiece = getBoardSquare(clickedSquare).piece;

    options.onSquareClick(clickedSquare, clickedPiece, selectedSquares);
  }

  this.move = function(fromSquare, toSquare) {
    console.log('Moving from ' + fromSquare + ' to ' + toSquare);
  };

  function repeatChar(char, count) {
    for (var result = ''; result.length < count;) {
      result += char;
    }

    return result;
  }

  function setPiece(square, piece) {
    var boardSquare = getBoardSquare(square);
    var currentPiece = boardSquare.piece;

    if (currentPiece !== null) {
      boardSquare.element.classList.remove(currentPiece);
    }

    boardSquare.element.classList.add(piece);
    boardSquare.element.style.backgroundPosition = backgroundPosition(piece);
    boardSquare.piece = piece;
  }

  function calcPieceFromFenPiece(fenPiece) {
    var fenPieceCharCode = fenPiece.charCodeAt(0);

    if (fenPieceCharCode >= 97) { // Black
      return 'b' + String.fromCharCode(fenPieceCharCode - 32);
    } else { // White
      return 'w' + fenPiece;
    }
  }

  this.setPosition = function(fen) {
    var fenFields = fen.split(' ');
    var rows = fenFields[0].split('/');

    for (var r = 0; r < 8; r++) {
      rows[r] = rows[r].replace(/\d/g, function(number) { 
        return repeatChar('.', +number);
      });

      for (var c = 0; c < 8; c++) {
        if (rows[r][c] !== '.') {
          setPiece(calcSquare(8 - r, c), calcPieceFromFenPiece(rows[r][c]));
        }
      }
    }
  };

  createBoard();

  setTimeout(function() { // Without setTimeout, boxSizing is not set yet.
    var boardStyle = getComputedStyle(board.element);

    boardBorderWidth = parseInt(boardStyle.borderWidth);

    if (boardStyle.boxSizing === 'border-box') {
      boardWidthFix = 2 * boardBorderWidth;
    } else  {
      boardWidthFix = 0;
    }

    setBoardSize();
    
    self.setPosition(options.fen);
  });

  if (options.resize) {
    window.addEventListener('resize', setBoardSize);
  }
};
