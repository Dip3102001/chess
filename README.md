# Angular Chess Game

![Chess Game Screenshot](https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessBoard.jpg)

A fully functional chess game built with Angular. This project implements a complete chess game with all standard chess rules including castling, en passant, pawn promotion, check and checkmate detection.

## Features

- Complete chess rule implementation
- Visual indication of possible moves
- Check and checkmate detection
- Pawn promotion
- Castling implementation
- Last move highlighting
- Responsive chess board design
- Clean UI with classic chess pieces

![Game in Play](https://upload.wikimedia.org/wikipedia/commons/d/d5/Chess_Board_with_Chess_Pieces.jpg)

## Tech Stack

- Angular 17+
- TypeScript
- HTML5/CSS3
- RxJS for state management

## Project Structure

The project is structured with a modular architecture:

```
chess/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   └── chess-board/      # Chess board component
│   │   ├── chess-item/           # Chess logic
│   │   │   ├── pieces/           # Individual chess piece logic
│   │   │   └── models.ts         # Type definitions
│   │   ├── services/             # Application services
│   │   └── app.component.*       # Main app component
│   ├── assets/
│   │   └── pieces/               # Chess piece images and data
│   └── ...
└── ...
```

## Game Logic Overview

The game implements object-oriented chess logic where each piece type extends a base `Piece` class:

- `Piece`: Abstract base class for all chess pieces
- `Pawn`, `Rook`, `Knight`, `Bishop`, `Queen`, `King`: Specific piece implementations
- `ChessBoard`: Contains the game state and move validation logic

The game features a robust move validation system that includes:
- Basic movement patterns for each piece
- Check detection
- "Move results in check" prevention
- Special move rules (castling, pawn promotion)

![Piece Promotion](https://upload.wikimedia.org/wikipedia/commons/3/37/ChessQueenPromotion.jpg)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chess.git
   cd chess
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`

## How to Play

1. White moves first
2. Click on a piece to see possible move locations
3. Click on a highlighted square to move the piece
4. When a pawn reaches the opposite end of the board, select a piece for promotion
5. Game ends when a king is in checkmate

## Features in Detail

### Check Detection
The game visually indicates when a king is in check with a red highlight. The player must resolve the check on their next move.

### Castling
When conditions are met (neither king nor rook has moved, path is clear, king not in check or passing through check), players can perform castling by moving the king two squares toward the rook.

### Pawn Promotion
When a pawn reaches the opposite end of the board, a promotion dialog appears allowing the player to choose a new piece (typically Queen, Rook, Bishop, or Knight).

## Future Enhancements

- Undo/redo functionality
- Game history notation
- Save/load game state
- Timer integration
- Multiplayer support
- AI opponent

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chess piece SVGs from Wikimedia Commons
- [Chess rules reference](https://en.wikipedia.org/wiki/Rules_of_chess)
