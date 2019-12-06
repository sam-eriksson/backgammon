export class HitValue {
    public name: String;
    public r: Number;
    public cx: Number;
    public cy: Number;
    public fill: String;
    public hidden: String;
    constructor(public white: boolean, public height: number, public topy: number, public bottomy: number, public leftx: number) {
        var r = Math.trunc(this.height/12);
        var onesixthx =  r;
        var onetwelthx =  Math.trunc( r/2 );
        this.cx = leftx + ( 12 * onesixthx ) + 100;
        this.r =onetwelthx;
        if (white) {
            this.fill = 'white';
            this.name =  '100';
            this.cy = 0.9 * bottomy;
        } else {
            this.fill = 'black';
            this.name =  '200';
            this.cy = 0.1 * bottomy;
        }
        this.hidden = 'hidden';
    }
}