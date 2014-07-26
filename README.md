# Overview

Pure Javascript implementation of chess board with no dependencies (doesn't require jQuery).

# How to use

1. Include `chessboard.css` and `chessboard.js`, and make sure that `chesspieces.png` is in the same location as `chessboard.css`.

2. Add something like `<div id="myBoard"></div>` in your HTML

3. Initialize the chess board: `var board = new ChessBoard('myBoard', options)`, where `options` is an object.

# Options

### `fen (string)`
Defines the initial position on the board. Defaults to the initial chess position.

### `resize (boolean)`
Whether the board will be resizable automatically on window resize. Defaults to `true`.

### `onSquareClick (function)`
Function that will be called when square is clicked. This function will have the following arguments:

1.`clickedSquare` - The clicked square (e.g. `'a4'`, `'h7'`)
2.`clickedPiece` - The clicked piece (e.g. `null`, `'wP'`, `'bK'`)
3. `selectedSquares` - Array of squares that were selected prior to click (e.g. `[]`, `['a7']`, `['e2', 'e4']`)

# API

### `selectSquare(square)`

Selects the given square. Does nothing if the given square was already selected.

Example:

    board.selectSquare('e6');
    
### `unselectSquare(square)`

Unselects the given square. Does nothing if the given square wasn't selected.

Example:

    board.unselectSquare('e6');

### `setPosition(fenString)`

Sets the given position. `fenString` must be in one of the following formats:

* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`
