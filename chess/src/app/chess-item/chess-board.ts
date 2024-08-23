import { Char, Color, Coords, Side } from "./models";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";


export class ChessBoard{
    private chessBoard: (Piece|null)[][];
    public readonly chessBoardSize : number = 8;

    constructor(){
        this.chessBoard = [
            [
                new Rook(Color.White,Side.Left),new Knight(Color.White),new Bishop(Color.White),new King(Color.White),
                new Queen(Color.White),new Bishop(Color.White),new Knight(Color.White),new Rook(Color.White,Side.Right)
            ],
            [
                new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),
                new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White)
            ],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [
                new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),
                new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black)
            ],
            [
                new Rook(Color.Black,Side.Left),new Knight(Color.Black),new Bishop(Color.Black),new King(Color.Black),
                new Queen(Color.Black),new Bishop(Color.Black),new Knight(Color.Black),new Rook(Color.Black,Side.Right)
            ]
        ];
    }

    public get viewChessBoard():(Char|null)[][]{
        return this.chessBoard.map((row)=>{
            return row.map((piece)=> piece instanceof Piece? piece.Char : null);
        });
    }

    public transform(from: Coords, to: Coords): void{
        const piece : Piece | null = this.chessBoard[from.x][from.y];

        if(piece instanceof Pawn || piece instanceof King || piece instanceof Rook){
            if(piece instanceof King && !piece.hasMoved){
                const castleLeftDir : Coords = this.add(from,piece.LeftCastleDirection());
                const castleRightDir : Coords = this.add(from,piece.RightCastleDirection());

                if(to.x === castleLeftDir.x && to.y === castleLeftDir.y){
                    const leftRook : Piece|null = this.chessBoard[from.x][0];

                    // transform rook
                    this.chessBoard[from.x][0] = null;
                    this.chessBoard[from.x][to.y+1] = leftRook;
                }

                if(to.x === castleRightDir.x && to.y === castleRightDir.y){
                    const rightRook : Piece|null = this.chessBoard[from.x][this.chessBoardSize-1];
                
                    // transform rook
                    this.chessBoard[from.x][this.chessBoardSize-1] = null;
                    this.chessBoard[from.x][to.y-1] = rightRook;
                }
            }

            piece.hasMoved = true;
        }

        this.chessBoard[to.x][to.y] = this.chessBoard[from.x][from.y];
        this.chessBoard[from.x][from.y] = null;
    }

    protected isEmptyInBetween(KingCoords : Coords, RookCoords : Coords) : boolean{
        const from:Coords = (KingCoords.y < RookCoords.y)?KingCoords:RookCoords;
        const to:Coords = (KingCoords.y < RookCoords.y)?RookCoords:KingCoords;

        let isEmpty : boolean = true;
        for(let x = from.y+1; x < to.y ;x++){
            if(this.chessBoard[from.x][x] !== null) 
                isEmpty = false;
        }

        return isEmpty;
    }

    protected castleMoveFor(piece : Piece, pieceCoords : Coords) : Coords[]|null{
        
        let moves : Coords[] = new Array<Coords>();
        
        if(piece instanceof King){
            if(!piece.hasMoved){
                const leftRook : Piece|null = this.chessBoard[pieceCoords.x][0];
                const rightRook : Piece|null = this.chessBoard[pieceCoords.x][this.chessBoardSize-1];
                if(leftRook instanceof Rook && leftRook.color === piece.color && !leftRook.hasMoved && this.isEmptyInBetween(pieceCoords,{x:pieceCoords.x,y:0})){
                    moves.push(this.add(pieceCoords,piece.LeftCastleDirection()));
                }
                if(rightRook instanceof Rook && rightRook.color === piece.color && !rightRook.hasMoved && 
                    this.isEmptyInBetween(pieceCoords,{x:pieceCoords.x,y:this.chessBoardSize-1})){
                    moves.push(this.add(pieceCoords,piece.RightCastleDirection()));
                }

                return moves;
            } else return null;
        }else return null;
    }

    protected get WhiteKing():Coords|null{
        for(let i = 0; i < this.chessBoardSize; i++){
            for(let j = 0; j < this.chessBoardSize; j++){
                if(this.chessBoard[i][j]?.Char === 'K')
                    return {x:i,y:j};
            }
        }
        return null;
    }

    protected get BlackKing():Coords|null{
        for(let i = 0; i < this.chessBoardSize; i++){
            for(let j = 0; j < this.chessBoardSize; j++){
                if(this.chessBoard[i][j]?.Char === 'k')
                    return {x:i,y:j};
            }
        }
        return null;
    }

    public getLegalMoves(init_position: Coords) : Coords[]|null{
        const piece : Piece | null = this.chessBoard[init_position.x][init_position.y];
        if(piece === null) return null;
        else{
            let stack = new Array<Coords>();
            this.getMoveForPiece(init_position,init_position,piece.color,piece.directions,stack,piece,true);
            let castleMoves : Coords[] | null = this.castleMoveFor(piece,init_position);
            if(castleMoves !== null)
                for(const move of castleMoves)
                    if(this.isSafe(init_position,move))
                        stack.push(move);
            return stack;
        }
    }

    protected isAllowed(position: Coords, color: Color) : boolean{
        if( (-1 < position.x && position.x < 8) && (-1 < position.y && position.y < 8) ){
            const location : Piece|null = this.chessBoard[position.x][position.y];
            if(location && location.color === color){
                return false;
            }
            return true;
        }else return false;        
    }

    protected isCaptured(position: Coords, color:Color) : boolean{
        if( (-1 < position.x && position.x < 8) && (-1 < position.y && position.y < 8) ){
            const location = this.chessBoard[position.x][position.y];
            if(location) return location.color !== color; 
            else return false;
        }else return false;
    }

    protected add(position : Coords, move : Coords) : Coords{
        let new_position : Coords = { x : position.x + move.x , y : position.y + move.y};
        return new_position;
    }

    protected getMoveForPiece(init_position: Coords, position: Coords, color: Color, 
        moves: Coords[], stack : Coords[], piece : Piece, isFirstMove: boolean=true) : void{
        if(isFirstMove){
            if(piece.Char.toLowerCase() === "p"){
                if(piece instanceof Pawn){
                    let pawn : Pawn = piece;
                    
                    console.log(pawn.directions);
                    for(let move of moves){
                            this.getMoveForPiece(init_position,this.add(position,move),color,[move],stack,piece,false);
                    }
                }
            }else{
                for(let move of moves){
                    let updated_move : Coords[] = [ move ];
                    this.getMoveForPiece(init_position,this.add(position,move),color,updated_move,stack,piece,false);
                }
            }
        }else{
            if(-1 < position.x && position.x < 8 && -1 < position.y && position.y < 8 && this.isSafe(init_position,position)){
                if(this.isCaptured(position,color)){
                    if(piece instanceof Pawn){
                        if(moves[0].y !== 0)
                            stack.push(position);
                    }else
                        stack.push(position);
                }else if(this.isAllowed(position,color)){
                    if(piece instanceof Pawn){
                        if(moves[0].y === 0){
                            stack.push(position);
                        }
                    }
                    else
                        stack.push(position);

                    if( !(piece instanceof Pawn || piece instanceof King || piece instanceof Knight))
                        this.getMoveForPiece(init_position,this.add(position,moves[0]),color,moves,stack,piece,false);
                } 
            }
        }
    }

    protected getMoveForPieceWithOutSafe(position:Coords, color:Color, 
        moves: Coords[], stack: Coords[], piece : Piece,isFirstMove: boolean=true) : void{
    
        if(isFirstMove){
            if(piece.Char.toLowerCase() === "p"){
                if(piece instanceof Pawn){
                    let pawn : Pawn = piece;

                    for(let move of moves)
                        this.getMoveForPieceWithOutSafe(this.add(position,move),color,[move],stack,piece,false);
                }
            }else{
                for(let move of moves){
                    let updated_move : Coords[] = [ move ];
                    this.getMoveForPieceWithOutSafe(this.add(position,move),color,updated_move,stack,piece,false);
                }
            }            
        }else{
            if(this.isCaptured(position,color)){
                if(piece instanceof Pawn){
                    if(moves[0].y !== 0)
                        stack.push(position);
                }else
                    stack.push(position);
            }else if(this.isAllowed(position,color)){
                
                if(piece instanceof Pawn){
                    if(moves[0].y === 0)
                            stack.push(position);
                }
                else
                    stack.push(position);

                if( !(piece instanceof Pawn || piece instanceof King || piece instanceof Knight) )
                    this.getMoveForPieceWithOutSafe(this.add(position,moves[0]),color,moves,stack,piece,false);
            }else return;
        }   
    }


    public isInCheck(position:Coords){
        return !this.isSafe(position,position);
    }

    protected isSafe(old_position:Coords, new_position:Coords) : boolean{
        const piece : Piece|null = this.chessBoard[old_position.x][old_position.y];
        
        const colorOfPiece = piece?.color;
        const colorOfOpponent = piece?.color === Color.White ? Color.Black : Color.White;
        
        const newPositionPiece : Piece | null = this.chessBoard[new_position.x][new_position.y]; 
        // simulating new position
        this.chessBoard[old_position.x][old_position.y] = null;
        this.chessBoard[new_position.x][new_position.y] = piece;

        const set:Set<string> = new Set<string>();

        for(let i = 0; i < this.chessBoardSize; i++){
            for(let j = 0; j < this.chessBoardSize; j++){
                const piece : Piece | null = this.chessBoard[i][j];
                if(piece && piece.color == colorOfOpponent){
                    let stack : Coords[] = new Array<Coords>();
                    this.getMoveForPieceWithOutSafe({x:i,y:j},colorOfOpponent,
                        piece.directions,stack,piece,true
                    );
                    for(let s of stack)
                        set.add(JSON.stringify(s));
                }
            }
        }

        const oppositeKingCoords:Coords|null = (colorOfPiece === Color.White)? this.WhiteKing : this.BlackKing;
        const _isSafe : boolean = oppositeKingCoords!=null && !set.has(JSON.stringify(oppositeKingCoords));  

        // back-to-normal
        this.chessBoard[old_position.x][old_position.y] = piece;
        this.chessBoard[new_position.x][new_position.y] = newPositionPiece;

        return _isSafe;
    }

    public isGameOver(color:Color) : boolean{
        const kingCoords : Coords | null = color === Color.White ? this.WhiteKing : this.BlackKing;
        if(kingCoords && this.isInCheck(kingCoords)){
            for(let x = 0; x < this.chessBoardSize ; x++){
                for(let y = 0; y < this.chessBoardSize; y++){
                    const piece : Piece | null = this.chessBoard[x][y];
                    if(piece instanceof Piece && piece.color === color){
                        const moves : Coords[] | null = this.getLegalMoves({x:x,y:y});
                        if(moves)
                            if(moves.length !== 0)
                                return false;
                    }
                }
            }
            return true;
        }else return false;
    }
}