# Overview

Minimalistic Javascript implementation of a chess board UI.

It just provides an API to visualize a chess board. If you are after validating chess rules, consider using [chess.js][1].

# Dependencies

None! (doesn't require jQuery)

# Supported browsers/platforms

* Latest Chrome
* Latest Firefox
* Latest Safari
* PhoneGap

# How to use

1. Include `chessboard.css` and `chessboard.js`, and make sure that `chesspieces.png` is in the same location as `chessboard.css`.

2. Add a board element in your HTML, e.g.: `<div id="myBoard"></div>`

3. Initialize the chess board: `var board = new ChessBoard('myBoard', options)`, where `options` is an object.

# Options

### fen (string)
Defines the initial position on the board. Defaults to the initial chess position.

### orientation (string)
Defined the orientation of the board. Should be `'w'` or `'b'`. Defaults to `'w'`.

### resize (boolean)
Whether the board will be resizable automatically on window resize. Defaults to `true`.

### onSquareClick (function)
Function that will be called when square is clicked. This function will have the following arguments:

1. `clickedSquare` - The clicked square (e.g. `'a4'`, `'h7'`)
2. `selectedSquares` - Array of squares that were selected prior to click (e.g. `[]`, `['a7']`, `['e2', 'e4']`)

# API

### selectSquare(square)
Selects the given square by adding the `'selected'` class to it.
Does nothing if the given square was already selected.

##### Example

    board.selectSquare('e6');
    
### unselectSquare(square)
Unselects the given square by removing the `'selected'` class from it.
Does nothing if the given square wasn't selected.

##### Example

    board.unselectSquare('e6');
    
### unselectAllSquares()
Unselects all the selected squares by removing the `'selected'` class from them.

##### Example

    board.unselectAllSquares();

### setPosition(fenString)
Sets the given position. `fenString` must be in one of the following formats:

* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
* `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`

### askPromotion(color, callback)
Presents a small dialog asking the user to choose a promotion piece (of a specified color, `'w'` or `'b'`). User has to click on a piece, and then on the "Promote" button, in order to close the dialog.

If a `callback` function is specified, it is will be called once the dialog is closed, and will have the following argument:

* `shortPiece` - The selected piece in the following format: `'q'`, `'r'`, `'n'`, `'b'`. It can be useful when integrating with other libraries such as [chess.js][1] (see the `promotion` option in [`move()`](https://github.com/jhlywa/chess.js#movemove)).

##### Example

    board.askPromotion('w', function(shortPiece) {
      // Now we know which piece user selected.
    });


[1]: https://github.com/jhlywa/chess.js
