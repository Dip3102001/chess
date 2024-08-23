import { Settings } from "node:http2";
import { Char, Color, Coords } from "./models";
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
                new Rook(Color.White),new Knight(Color.White),new Bishop(Color.White),new King(Color.White),
                new Queen(Color.White),new Bishop(Color.White),new Knight(Color.White),new Rook(Color.White)
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
                new Rook(Color.Black),new Knight(Color.Black),new Bishop(Color.Black),new King(Color.Black),
                new Queen(Color.Black),new Bishop(Color.Black),new Knight(Color.Black),new Rook(Color.Black)
            ]
        ];
    }

    public get viewChessBoard():(Char|null)[][]{
        return this.chessBoard.map((row)=>{
            return row.map((piece)=> piece instanceof Piece? piece.Char : null);
        });
    }

    public transform(from: Coords, to: Coords): void{
        const piece : Piece | null = this.chessBoard[from.x][to.y];

        if(piece instanceof Pawn)
            piece.hasMoved = true;

        this.chessBoard[to.x][to.y] = this.chessBoard[from.x][from.y];
        this.chessBoard[from.x][from.y] = null;
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


    protected isSafe(old_position:Coords, new_position:Coords) : boolean{
        const piece : Piece|null = this.chessBoard[old_position.x][old_position.y];
        
        const colorOfPiece = piece?.color;
        const colorOfOpponent = piece?.color === Color.White ? Color.Black : Color.White;
        
        const newPositionPiece : Piece | null = this.chessBoard[new_position.x][new_position.y]; 
        // simulating new position
        this.chessBoard[new_position.x][new_position.y] = piece;
        this.chessBoard[old_position.x][old_position.y] = null;

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
}