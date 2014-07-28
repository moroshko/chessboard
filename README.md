# Overview

Minimalistic Javascript implementation of a chess board UI.

It just provides an API to visualize a chess board. If you are after validating chess rules, consider using [chess.js][1].

# Dependencies

None! (doesn't require jQuery)

# Supported browsers/platforms

* Latest Chrome
* Latest Firefox
* PhoneGap

# How to use

1. Include `chessboard.css` and `chessboard.js`, and make sure that `chesspieces.png` is in the same location as `chessboard.css`.

2. Add something like `<div id="myBoard"></div>` in your HTML

3. Initialize the chess board: `var board = new ChessBoard('myBoard', options)`, where `options` is an object.

# Options

### fen (string)
Defines the initial position on the board. Defaults to the initial chess position.

### orientation ('w' or 'b')
Defined the orientation of the board. Defaults to `'w'`.

### resize (boolean)
Whether the board will be resizable automatically on window resize. Defaults to `true`.

### onSquareClick (function)
Function that will be called when square is clicked. This function will have the following arguments:

1. `clickedSquare` - The clicked square (e.g. `'a4'`, `'h7'`)
2. `selectedSquares` - Array of squares that were selected prior to click (e.g. `[]`, `['a7']`, `['e2', 'e4']`)

# API

### selectSquare(square)
Selects the given square. Does nothing if the given square was already selected.

##### Example

    board.selectSquare('e6');
    
### unselectSquare(square)
Unselects the given square. Does nothing if the given square wasn't selected.

##### Example

    board.unselectSquare('e6');

### setPosition(fenString)
Sets the given position. `fenString` must be in one of the following formats:

* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`

### move(fromSquare, toSquare, options)
Moves piece from `fromSquare` to `toSquare`. If there is a piece on `toSquare`, it is removed.

By providing `options`, special moves can be handled. The following options are available:

* `enPassant: true` - will remove the captured opponent's pawn
* `kingsideCastling: true` - will move the 'h' rook to 'f'
* `queensideCastling: true` - will move the 'a' rook to 'd'
* `promotion: piece` - will put the promotion piece on `toSquare`

##### Examples

    board.move('e2', 'e4');
    board.move('d5', 'e6', { enPassant: true });
    board.move('e8', 'g8', { kingsideCastling: true });
    board.move('e1', 'c1', { queensideCastling: true });
    board.move('g7', 'h8', { promotion: 'wQ' });         // or 'wR', 'wN', 'wB'
    board.move('b2', 'b1', { promotion: 'bQ' });         // or 'bR', 'bN', 'bB'

### askPromotion(color, callback)
Asks user to choose a promotion piece for a given color (`'w'` or `'b'`).

If a `callback` function is specified, it is will be called once the user made the choice, and will have the following arguments:

1. `piece` - The chosen piece in the following format: `'wQ'`, `'wR'`, `'bB'`, etc. It can be useful for the `promotion` option in `move()`.
2. `shortPiece` - The chosen piece in the following format: `'q'`, `'r'`, `'n'`, `'b'`. It can be useful when integrating with other libraries such as [chess.js][1] (see the `promotion` option in [`move()`](https://github.com/jhlywa/chess.js#movemove)).

##### Examples

    board.askPromotion('w', function(piece, shortPiece) {
      // Now we know which piece user chose. Do something with this piece.
    });


[1]: https://github.com/jhlywa/chess.js
