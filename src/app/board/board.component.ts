import { Component, OnInit, Input } from '@angular/core';
import {CircleValues} from './circlevalues';
import {TriangleValues} from './trianglevalues';
import {BoardPositions} from './boardpositions';
import {DiceValues} from './dicevalues'
import {TextInformation} from './textinformation';
import {GameInfo} from './gameinfo';
import {HitValue} from './hitvalue';
import {MessageState} from './messagestate';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  gameinfo = new GameInfo();
  //Window Height and Width
  width: Number;
  height: number;

  //Points, and chips
  triangleValues: TriangleValues[];
  circleValues: CircleValues[];

  //What was the last chip clicked
  lastChipClicked: string;
  
  //Board, Dice, Text
  bp: BoardPositions;
  dv: DiceValues;
  tx: TextInformation;

  //Boad Position
  topy: number;
  bottomy: number;
  leftx: number;
  
  //Whos Move
  whitesMove: boolean;

  //Dice Values
  dice1val: number;
  dice2val: number;

  gameInfo: GameInfo;

  //Hit Values
  whitehit: HitValue;
  blackhit: HitValue;

  //Roll Dice
  rollDiceInd: boolean;

  constructor() { }

  ngOnInit() {
    this.whitesMove = false;
    this.rollDiceInd = true;
    this.lastChipClicked = 'x';
    this.circleValues =[];
    this.triangleValues = [];

    this.width = innerWidth-20;
    this.height = innerHeight-20; 

    var w = parseInt('' + this.width );
    var h = parseInt('' + this.height );

    var xoffset = 0;
    var yoffset = 0;
    var r = 0;
    xoffset = Math.trunc((h-w)/-2);
    r = Math.trunc(h/12);

    this.topy = yoffset;
    this.bottomy = h - yoffset;
    this.leftx = xoffset;
    //Set Text
    this.tx = new TextInformation(h, this.topy, this.bottomy, this.leftx);
    var texts = ['White','','','Roll','Dice'];
    this.setTextBox(texts);
    //Layout the DICE
    this.dv = new DiceValues(this.height, this.topy, this.bottomy, this.leftx);
    this.dv.dv[0].setDice(1);

    //Layout the POINTS
    for (var i=0; i<24; i++) {this.triangleValues.push(new TriangleValues(i, h, this.topy, this.bottomy, this.leftx));}
    
    //Layout the CHIPS
    this.bp = new BoardPositions();
    var m=0;
    for(var k=0; k< this.bp.boardpositions.length; k++ ) { 
      for (var l=0; l<this.bp.boardpositions[k].chipNumbers.length; l++) {
        this.circleValues.push(new CircleValues(''+this.bp.boardpositions[k].chipNumbers[l], k,
          l, this.bp.boardpositions[k].white, h, this.topy, this.bottomy, this.leftx));
        m++;
      } 
    }

    //Set Hit Chip values
    this.blackhit = new HitValue(false, h, this.topy, this.bottomy, this.leftx);
    this.whitehit = new HitValue(true, h, this.topy, this.bottomy, this.leftx);
  }

  clickEventChip(event: MouseEvent) {
    if (this.checkIfSelectable(event)) {
      this.setUnSelected();
      this.lastChipClicked =  (<SVGAElement>event.currentTarget).id;
      this.setSelected();
    }
  }

  checkIfSelectable(event: MouseEvent) {
    if (((this.whitesMove && this.circleValues[parseInt((<SVGAElement>event.currentTarget).id)].white) ||
    (!this.whitesMove && !this.circleValues[parseInt((<SVGAElement>event.currentTarget).id)].white)) &&
    (!this.rollDiceInd)&&
    ((this.whitesMove&&this.bp.boardpositions[this.bp.whiteHitPosition].chipNumbers.length==0)||
    (!this.whitesMove&&this.bp.boardpositions[this.bp.blackHitPosition].chipNumbers.length==0)))
    return true;
    else return false;
  }

  setSelected() {
    var cn = parseInt(this.lastChipClicked);
    this.circleValues[cn].fill = 'grey';
  }

  setUnSelected() {
    if (this.lastChipClicked !== 'x') {
      var cn = parseInt(this.lastChipClicked);
      if (this.circleValues[cn].white) {
        this.circleValues[cn].fill = 'white';
      } else {
        this.circleValues[cn].fill = 'black';
      }
    }
    
  }

  clickEventTri(event: Event) {
    if (!this.rollDiceInd) {
      var i;
      i = (<SVGAElement>event.currentTarget).id;
      if (this.lastChipClicked!='x') {
        this.move(this.lastChipClicked, i);
      } 
      //add move onto board situation.
      if (((!this.whitesMove)&&(this.bp.boardpositions[this.bp.blackHitPosition].chipNumbers.length>0))||
      ((this.whitesMove)&&(this.bp.boardpositions[this.bp.whiteHitPosition].chipNumbers.length>0))) {
          var ms = (<MessageState>this.gameinfo.checkHitMove(parseInt(i), this.bp, this.whitesMove, this.dice2val, this.dice1val));
          //alert(ms.alertMessage);
          this.setTextBox(ms.boxMessage);
          if (ms.moveAllowed) {
            // *** TODO ***
            var chipnum = 0;
            var startpoint = 0;
            if (this.whitesMove) {
              chipnum = this.bp.boardpositions[this.bp.whiteHitPosition].chipNumbers[this.bp.boardpositions[this.bp.whiteHitPosition].chipNumbers.length-1];
              startpoint = this.bp.whiteHitPosition;
            } else {
              chipnum = this.bp.boardpositions[this.bp.blackHitPosition].chipNumbers[this.bp.boardpositions[this.bp.blackHitPosition].chipNumbers.length-1];
              startpoint = this.bp.blackHitPosition;
            }
            var endpt = 0;
            endpt = i;
            this.moveAllowed(chipnum, startpoint, endpt);
          }
          if (ms.noMoreMoves) {
            this.rollDiceInd=true;
            this.lastChipClicked='x'
          }
      } 
    }
  }

  clickHome(event: Event) {
    if (!this.rollDiceInd) {
      if (this.lastChipClicked!='x') {
        var chipnumber = this.lastChipClicked;
        var startpoint = this.circleValues[chipnumber].point;
        var ms =(<MessageState>this.gameinfo.checkMoveHome(startpoint, this.bp, this.whitesMove, this.dice2val, this.dice1val));
        this.setTextBox(ms.boxMessage);
        var chipnum = parseInt(chipnumber);
        if (ms.moveAllowed) {
          var endpt =0;
          if (this.whitesMove) var endpt = this.bp.whiteHomePosition;
          else endpt = this.bp.blackHomePosition;
          this.moveAllowed(chipnum, startpoint, endpt);
        }
        if (ms.noMoreMoves) {
          this.rollDiceInd=true;
          this.lastChipClicked='x'
        }
      }
    }
  }

  move(chipnumber: string, endpoint: string) {
    this.setUnSelected();
    var chipnum = parseInt(chipnumber);
    var endpt = parseInt(endpoint);
    var startpoint = this.circleValues[chipnum].point;
    //check the move.
    var ms = (<MessageState>this.gameinfo.checkMove(startpoint, endpt, this.bp, this.whitesMove, this.dice2val, this.dice1val));
    //alert(ms.alertMessage);
    this.setTextBox(ms.boxMessage);
    if (ms.moveAllowed) {
      this.moveAllowed(chipnum, startpoint, endpt);
    }

    if (ms.noMoreMoves) {
      this.rollDiceInd=true;
      this.lastChipClicked='x'
    }

  }

  moveAllowed(chipnum: number, startpoint: number, endpt: number) {
    //check if one piece of different color
    if ((this.whitesMove&&!this.bp.boardpositions[endpt].white&&(this.bp.boardpositions[endpt].chipNumbers.length==1))
    ||(!this.whitesMove&&this.bp.boardpositions[endpt].white&&(this.bp.boardpositions[endpt].chipNumbers.length==1))) {
      this.bp.moveHit(startpoint, endpt, chipnum, this.whitesMove);

      //chip on point moves to hit position
      var hitpos =  this.bp.whiteHitPosition;
      if (this.whitesMove) hitpos =  this.bp.blackHitPosition;
      var hitposlen = this.bp.boardpositions[hitpos].chipNumbers.length -1;
      var chip2num = this.bp.boardpositions[hitpos].chipNumbers[hitposlen];
      this.circleValues[chip2num] = new CircleValues(''+chip2num, hitpos,
      hitposlen, !this.whitesMove, this.height, this.topy, this.bottomy, this.leftx);
      //chip moves to point position 0
      var posn = 0;
      this.circleValues[chipnum] = new CircleValues(''+chipnum, endpt,
      posn, this.whitesMove, this.height, this.topy, this.bottomy, this.leftx);

    } else {
      this.bp.move(startpoint, endpt, chipnum);
      var posn = this.bp.boardpositions[endpt].chipNumbers.length-1;
      this.circleValues[chipnum] = new CircleValues(''+chipnum, endpt,
      posn, this.whitesMove, this.height, this.topy, this.bottomy, this.leftx);
    }  
  }

  rollDice(event: Event) {
    if (this.rollDiceInd) {
      this.dice1val = Math.trunc(Math.random()*6)+1;
      this.dice2val = Math.trunc(Math.random()*6)+1;
      this.dv.dv[0].setDice(this.dice1val);
      this.dv.dv[1].setDice(this.dice2val);
      this.whitesMove = !this.whitesMove;
      this.rollDiceInd = false;
      var texts = [];
      if (this.whitesMove) {
        texts.push('WHITE');
      } else {
        texts.push('BLACK');
      }
      texts.push('');
      texts.push('');
      texts.push('MOVE');
      texts.push('');
      this.setTextBox(texts);
    }
  }

  setTextBox(texts: string[]) {
      this.tx.setText1(texts[0]);      
      this.tx.setText2(texts[1]);
      this.tx.setText3(texts[2]);
      this.tx.setText4(texts[3]);
      this.tx.setText5(texts[4]);
  }
}
