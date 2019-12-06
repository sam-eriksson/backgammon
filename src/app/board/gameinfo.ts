import {BoardPositions} from './boardpositions';
import {MessageState} from './messagestate';
import { BPClient } from 'blocking-proxy';
import { truncate } from 'fs';
export class GameInfo {

    dice1NotMoved: boolean;
    dice2NotMoved: boolean;

    constructor() {
        this.dice1NotMoved=true;
        this.dice2NotMoved=true;
    }

    //chip point number cp, point number
    //24 points can have as many of one color 
    //white moves bottom left clockwise
    //black moves top left counter clockwise
    //legal move is one dice or combination if space inbetween is legal.
    checkMove(cp: number,p: number, bp: BoardPositions, whitesMove: boolean, dice2val: number, dice1val: number) {
        if (whitesMove) {
            if (bp.boardpositions[bp.whiteHitPosition].chipNumbers.length>0) {
                var messagestate = new MessageState(false,
                     'WHITE CAN ONLY MOVE OFF BOARD CHIPS',
                      false,
                       ['WHITE','','','MOVE','']);
                return messagestate ;
            }
            //check if dice value matches dice rolls available
            if (this.dice2NotMoved&&((p-cp) == dice2val) &&this.allowedToMove(bp, p, whitesMove) ) {
                if (this.dice1NotMoved) { 
                    this.dice2NotMoved=false;
                    var messagestate = new MessageState(true,
                         'DICE 2 MOVE',
                          false,
                           ['WHITE','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'WHITE NO MORE MOVES ROLL DICE',
                          true,
                           ['BLACK','','','ROLL','DICE']);
                    return messagestate ;
                }
            } else if (this.dice1NotMoved&&((p-cp) == dice1val)&&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice2NotMoved) {
                    this.dice1NotMoved=false; 
                    var messagestate = new MessageState(true,
                         'DICE 1 MOVE',
                          false,
                           ['WHITE','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'WHITE NO MORE MOVES ROLL DICE',
                          true,
                           ['BLACK','','','ROLL','DICE']);
                    return messagestate ;
                } 
            } else {
                var messagestate = new MessageState(false,
                     'WHITE NOT A MOVE ALLOWED BY EITHER DICE',
                      false,
                       ['WHITE','','','MOVE','']);
                return messagestate ;
            }
        } else {
            if (bp.boardpositions[bp.blackHitPosition].chipNumbers.length>0) {
                var messagestate = new MessageState(false, 'BLACK CAN ONLY MOVE OFF BOARD CHIPS', false, ['BLACK','','','MOVE','']);
                return messagestate ;
            }
            //check if dice value matches dice rolls available
            if (this.dice2NotMoved&&(( cp - p ) == dice2val) &&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice1NotMoved) { 
                    this.dice2NotMoved=false;
                    var messagestate = new MessageState(true,
                         'DICE 2 MOVE',
                          false,
                           ['BLACK','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'BLACK NO MORE MOVES ROLL DICE',
                          true,
                           ['WHITE','','','ROLL','DICE']);
                    return messagestate ;
                }
            } else if (this.dice1NotMoved&&(( cp - p ) == dice1val) &&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice2NotMoved) {
                    this.dice1NotMoved=false; 
                    var messagestate = new MessageState(true,
                         'DICE 1 MOVE',
                          false,
                           ['BLACK','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'BLACK NO MORE MOVES ROLL DICE',
                          true,
                           ['WHITE','','','ROLL','DICE']);
                    return messagestate ;
                } 
            } else {
                var messagestate = new MessageState(false, 'BLACK NOT A MOVE ALLOWED BY EITHER DICE', false, ['BLACK','','','MOVE','CHECKER']);
                return messagestate ;
            }
        }
    }

    checkHitMove(p: number, bp: BoardPositions, whitesMove: boolean, dice2val: number, dice1val: number) {
        if (whitesMove) {
            //check if dice value matches dice rolls available
            if (this.dice2NotMoved&&((p+1) == dice2val) &&this.allowedToMove(bp, p, whitesMove) ) {
                if (this.dice1NotMoved) { 
                    this.dice2NotMoved=false;
                    var messagestate = new MessageState(true,
                         'DICE 2 MOVE',
                          false,
                           ['WHITE','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'WHITE NO MORE MOVES ROLL DICE',
                          true,
                           ['BLACK','','','ROLL','DICE']);
                    return messagestate ;
                }
            } else if (this.dice1NotMoved&&((p+1) == dice1val)&&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice2NotMoved) {
                    this.dice1NotMoved=false; 
                    var messagestate = new MessageState(true,
                         'DICE 1 MOVE',
                          false,
                           ['WHITE','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'WHITE NO MORE MOVES ROLL DICE',
                          true,
                           ['BLACK','','','ROLL','DICE']);
                    return messagestate ;
                } 
            } else {
                var messagestate = new MessageState(false,
                     'WHITE NOT A MOVE ALLOWED BY EITHER DICE',
                      false,
                       ['WHITE','','','MOVE','']);
                return messagestate ;
            }
        } else {
            //check if dice value matches dice rolls available
            if (this.dice2NotMoved&&(( 24 - p ) == dice2val) &&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice1NotMoved) { 
                    this.dice2NotMoved=false;
                    var messagestate = new MessageState(true,
                         'DICE 2 MOVE',
                          false,
                           ['BLACK','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'BLACK NO MORE MOVES ROLL DICE',
                          true,
                           ['WHITE','','','ROLL','DICE']);
                    return messagestate ;
                }
            } else if (this.dice1NotMoved&&(( 24 - p ) == dice1val) &&this.allowedToMove(bp, p, whitesMove)) {
                if (this.dice2NotMoved) {
                    this.dice1NotMoved=false; 
                    var messagestate = new MessageState(true,
                         'DICE 1 MOVE',
                          false,
                           ['BLACK','','','MOVE','']);
                    return messagestate ;
                } else {
                    this.dice2NotMoved=true;
                    this.dice1NotMoved=true;
                    var messagestate = new MessageState(true,
                         'BLACK NO MORE MOVES ROLL DICE',
                          true,
                           ['WHITE','','','ROLL','DICE']);
                    return messagestate ;
                } 
            } else {
                var messagestate = new MessageState(false, 'BLACK NOT A MOVE ALLOWED BY EITHER DICE', false, ['BLACK','','','MOVE','CHECKER']);
                return messagestate ;
            }
        }
    }

    allowedToMove(bp: BoardPositions, p: number, whitesMove: boolean) {
        if ((bp.boardpositions[p].white && whitesMove) || (!bp.boardpositions[p].white && !whitesMove) )  return true;
        else if (bp.boardpositions[p].chipNumbers.length<2) return true
        else return false;
    }

    checkMoveHome(chipppoint: number,
         bp: BoardPositions,
         whitesMove: boolean,
         dice2val: number, 
         dice1val: number) {
        //check if all in home board.
        if (this.checkIfHomeBoard(whitesMove, bp)) {
            //check if valid move
            return this.checkIfValidMoveToHome(chipppoint,
                whitesMove,
                dice2val, 
                dice1val);
        } else {
            var messagestate = new MessageState(false,
                'CANNOT MOVE HOME NOT ALL PIECES ON HOME BOARD',
                false,
                ['CANNOT','MOVE','HOME','','']); 
            return messagestate;
        }
    }

    checkIfValidMoveToHome(chippoint: number,
        whitesMove: boolean,
        dice2val: number, 
        dice1val: number) {
        var diff = chippoint;
        if (whitesMove) {
            var diff = 24 - chippoint;
        }
        if (dice1val>dice2val&&this.dice2NotMoved) {
            if (diff<=dice2val) {
                this.dice2NotMoved= false;
                return this.returnMessage(true);
            } else if (diff<=dice1val&&this.dice1NotMoved) {
                this.dice1NotMoved= false;
                return this.returnMessage(true);
            } else {
                return this.returnMessage(false);
            }
        } else {
            if (diff<=dice1val&&this.dice1NotMoved) {
                this.dice1NotMoved= false;
                return this.returnMessage(true);
            } else if (diff<=dice2val&&this.dice2NotMoved) {
                this.dice2NotMoved= false;
                return this.returnMessage(true);
            } else {
                return this.returnMessage(false);
            }
        }
    }

    returnMessage(t: boolean) {
        if (t) {
            if (!this.dice2NotMoved&&!this.dice1NotMoved) {
                return  new MessageState(true,
                'NO MORE MOVES ROLL DICE',
                true,
                ['ROLL','DICE','','','']);
            } else {
                return  new MessageState(true,
                    'DICE MOVE HOME',
                    false,
                    ['','MOVE','HOME','','']);
            }
        } else {
            this.dice2NotMoved=true;
            this.dice1NotMoved=true;
            return new MessageState(false,
                'NO MOVE HOME',
                false,
                ['','MOVE','HOME','','']);
        }
    }

    checkIfHomeBoard(whitesMove: boolean, bp: BoardPositions) {
        var total = 0;
        if (whitesMove) {
            //check if all whites are in points 18-23 or Home
            for(var i=18; i<24; i++) {
                if (bp.boardpositions[i].white == true) {
                    total = total + bp.boardpositions[i].chipNumbers.length;
                }
            }
            total = total 
            + bp.boardpositions[bp.whiteHomePosition].chipNumbers.length;
        } else {
            //check if all blacks are in points 0-5 or Home
            for(var i=0; i<6; i++) {
                if (bp.boardpositions[i].white != true) {
                    total = total + bp.boardpositions[i].chipNumbers.length;
                }
            }
            total = total 
            + bp.boardpositions[bp.blackHomePosition].chipNumbers.length;
        }
        if (total==15) return true;
        else false;
    }
}