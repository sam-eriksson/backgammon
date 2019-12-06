export class TextInformation {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    boxtopx: number;
    boxtopy: number;
    boxwidth: number;
    boxheight: number;

    text1x: number;
    text2x: number;
    text3x: number;
    text4x: number;
    text5x: number;

    text1y: number;
    text2y: number;
    text3y: number;
    text4y: number;
    text5y: number;

    constructor(public height: number, public topy: number, public bottomy: number, public leftx: number) {
        this.boxtopx = leftx + height+ 30;
        this.boxtopy = height * .3;
        this.boxwidth = 200;
        this.boxheight = 300;
        this.text1x = this.boxtopx +20;
        this.text1y = this.boxtopy +50;
        this.text2x = this.text1x;
        this.text3x = this.text1x;
        this.text4x = this.text1x;
        this.text5x = this.text1x;
        this.text5y = this.text1y + 200;
        this.text2y = this.text1y + 50;
        this.text3y = this.text1y + 100;
        this.text4y = this.text1y + 150;
        this.text5y = this.text1y + 200;
    }

    setText1(ins: string) {
        this.text1 =ins;
    }
    setText2(ins: string) {
        this.text2 =ins;
    }
    setText3(ins: string) {
        this.text3 =ins;
    }
    setText4(ins: string) {
        this.text4 =ins;
    }
    setText5(ins: string) {
        this.text5 =ins;
    }
}