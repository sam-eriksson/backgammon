export class CircleValues {
    name: String;
    public r: Number;
    public cx: Number;
    public cy: Number;
    public fill: String;

    constructor(public piece: string, public point: number, public position: number, public white: boolean,
         public height: number, public topy: number, public bottomy: number, public leftx: number) {
        //need logic for hit positions.
        var r = Math.trunc(this.height/12);
        var onesixthx =  r;
        var onetwelthx =  Math.trunc( r/2 );

        var xtranslation = [11,10,9,8,7,6,5,4,3,2,1,0,0,1,2,3,4,5,6,7,8,9,10,11,14,14,-1.5,-1.5];
        var ytranslation = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
        if (point>11) {
            ytranslation = [11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7];
        }
        if (point>23) {
            ytranslation =[0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
        }
        if (point>24) {
            ytranslation=[11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7];
        }
        if (point>25) {
            ytranslation =[0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
        }
        if (point>26) {
            ytranslation=[11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7,11,10,9,8,7];
        }
        var xp = xtranslation[point];
        var yp = ytranslation[position];

        
        this.cx = leftx + ( xp * onesixthx ) + onetwelthx;
        this.cy = bottomy - yp * onesixthx  - onetwelthx;

        this.name =  this.piece;
        this.r =onetwelthx;
        
        if (white) {
            this.fill = 'white';
        } else {
            this.fill = 'black';
        }
    }
}