import {Point} from './point'
export class DiceValue {
    topy: number;
    height: number;
    topx: number;
    //die
    p: Point[];
    hidden: string[][];

    constructor(public dice: number, public h: number, public tpy: number, public bottomy: number, public leftx: number, public initialNumber: number) {
        if (dice<1) {
            this.topy = tpy + (bottomy - tpy)*0.3
        } else {
            this.topy = tpy + (bottomy - tpy)*0.6
        }
        this.initialNumber = this.initialNumber -1;
        this.height = ((bottomy - tpy)*0.4)*0.4
        this.topx = (leftx - this.height) * .33;
        this.setHidden();
        this.p= [];
        this.p.push({x: this.topx + (this.height *.2), y:this.topy + (this.height *.2), hidden: this.hidden[this.initialNumber][0]});
        this.p.push({x: this.topx + (this.height *.5), y:this.topy + (this.height *.2), hidden: this.hidden[this.initialNumber][1]});
        this.p.push({x: this.topx + (this.height *.8), y:this.topy + (this.height *.2), hidden: this.hidden[this.initialNumber][2]});
        this.p.push({x: this.topx + (this.height *.2), y:this.topy + (this.height *.5), hidden: this.hidden[this.initialNumber][3]});
        this.p.push({x: this.topx + (this.height *.5), y:this.topy + (this.height *.5), hidden: this.hidden[this.initialNumber][4]});
        this.p.push({x: this.topx + (this.height *.8), y:this.topy + (this.height *.5), hidden: this.hidden[this.initialNumber][5]});
        this.p.push({x: this.topx + (this.height *.2), y:this.topy + (this.height *.8), hidden: this.hidden[this.initialNumber][6]});
        this.p.push({x: this.topx + (this.height *.5), y:this.topy + (this.height *.8), hidden: this.hidden[this.initialNumber][7]});
        this.p.push({x: this.topx + (this.height *.8), y:this.topy + (this.height *.8), hidden: this.hidden[this.initialNumber][8]});
    }

    setHidden() {
        this.hidden = [];
        this.hidden.push(['hidden','hidden','hidden','hidden','visible','hidden','hidden','hidden','hidden']); //1
        this.hidden.push(['visible','hidden','hidden','hidden','hidden','hidden','hidden','hidden','visible']); //2
        this.hidden.push(['visible','hidden','hidden','hidden','visible','hidden','hidden','hidden','visible']); //3
        this.hidden.push(['visible','hidden','visable','hidden','hidden','hidden','visible','hidden','visible']); //4
        this.hidden.push(['visible','hidden','visable','hidden','visible','hidden','visible','hidden','visible']); //5
        this.hidden.push(['visible','hidden','visible','visible','hidden','visible','visible','hidden','visible']); //6
    }

    setDice(num: number) {
        num = num -1;
        for (var i=0; i<9; i++) {
            this.p[i].hidden = this.hidden[num][i];
        }
    }
}