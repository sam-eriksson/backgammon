import {BoardPosition} from './boardposition';
export class BoardPositions {

    boardpositions: BoardPosition[];
    public whiteHitPosition: number = 24;
    public blackHitPosition: number = 25;
    public whiteHomePosition: number = 26;
    public blackHomePosition: number = 27;
 
    constructor() { 
        this.boardpositions = [];
        for (var i=0; i<26; i++) {
            this.boardpositions.push({white: false, chipNumbers: []});
        }
        this.boardpositions[0] = {white: true, chipNumbers: [0,1]};
        this.boardpositions[11] = {white: true, chipNumbers: [10,11,12,13,14]};
        this.boardpositions[17] = {white: true, chipNumbers: [20,21,22]};
        this.boardpositions[18] = {white: true, chipNumbers: [23,24,25,26,27]};
        this.boardpositions[5] = {white: false, chipNumbers: [2,3,4,5,6]};
        this.boardpositions[6] = {white: false, chipNumbers: [7,8,9]};
        this.boardpositions[12] = {white: false, chipNumbers: [15,16,17,18,19]};
        this.boardpositions[23] = {white: false, chipNumbers: [28,29]};
        //this.boardpositions[19] = {white: true, chipNumbers: [15,16,17,18,19]};
        //this.boardpositions[20] = {white: true, chipNumbers: [20,21,22,23,24]};
        //this.boardpositions[21] = {white: true, chipNumbers: [25,26,27,28,29]};
        //this.boardpositions[2] = {white: false, chipNumbers: [0,1,2,3,4]};
        //this.boardpositions[3] = {white: false, chipNumbers: [5,6,7,8,9]};
        //this.boardpositions[4] = {white: false, chipNumbers: [10,11,12,13]};
        //this.boardpositions[5] = {white: false, chipNumbers: [14]};
        this.boardpositions[this.whiteHitPosition] = {white: true, chipNumbers: []}; // white hit position
        this.boardpositions[this.blackHitPosition] = {white: false, chipNumbers: []}; // black hit position
        this.boardpositions[this.whiteHomePosition] = {white: true, chipNumbers: []}; // white home position
        this.boardpositions[this.blackHomePosition] = {white: false, chipNumbers:[]}; // black home position
    }

    move(startpoint: number, endpoint: number, chipnumber: number) {
        var result = this.boardpositions[startpoint].chipNumbers.filter(val => val != chipnumber);
        this.boardpositions[startpoint].chipNumbers = result;

        this.boardpositions[endpoint].chipNumbers.push(chipnumber);
        this.boardpositions[endpoint].white = this.boardpositions[startpoint].white;
    }

    moveHit(startpoint: number, endpoint: number, chipnumber: number, whiteMove: boolean) {
        //remove chip from point that it is moving from
        var result = this.boardpositions[startpoint].chipNumbers.filter(val => val != chipnumber);
        this.boardpositions[startpoint].chipNumbers = result;

        //move hit chip to hit position
        if (!whiteMove) this.boardpositions[this.whiteHitPosition].chipNumbers.push(this.boardpositions[endpoint].chipNumbers[0]);
        else this.boardpositions[this.blackHitPosition].chipNumbers.push(this.boardpositions[endpoint].chipNumbers[0]);

        //remove chip that is getting hit.
        this.boardpositions[endpoint].chipNumbers = [];

        //add chip that is moving to new point on board
        this.boardpositions[endpoint].chipNumbers.push(chipnumber);
        this.boardpositions[endpoint].white = this.boardpositions[startpoint].white;
    }
}