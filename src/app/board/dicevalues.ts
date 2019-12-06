import {DiceValue} from './dicevalue'
export class DiceValues {

    dv: DiceValue[];

    constructor(public height: number, public topy: number, public bottomy: number, public leftx: number) {
        this.dv = [];
        var initial: number = 6;
        this.dv.push(new DiceValue(0, height, topy, bottomy,leftx, initial));
        this.dv.push(new DiceValue(1, height, topy, bottomy,leftx, initial));
    }
}