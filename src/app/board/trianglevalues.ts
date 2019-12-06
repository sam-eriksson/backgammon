export class TriangleValues {
    public name: String;
    polygon: String;
    fills: String;

    constructor(public position: number, public height: number, public topy: number, public bottomy: number, public leftx: number) {
        var xtranslation = [11,10,9,8,7,6,5,4,3,2,1,0,12,13,14,15,16,17,18,19,20,21,22,23];
        this.name = '' + xtranslation[position];
        var r = Math.trunc(this.height/12);
        var onesixthx =  r;
        var onetwelthx =  Math.trunc( r/2 );
        var fortypery = (5 * r) + Math.trunc(r/2);
        var sixtypery =  this.height - (5 * r) - Math.trunc(r/2);

        var filling = 'rgb(74, 110, 74)';
        if (this.position/2==Math.trunc(this.position/2)) {filling = 'rgb(44, 70, 44)';}
        this.fills = filling;

        if (this.position<12) {
            // TRIANGLE
            var point1x = this.leftx + this.position * onesixthx;
            var point1y = bottomy;
            this.polygon = '' + point1x + ',' + point1y + ' ';

            var point2x = this.leftx + (this.position * onesixthx)  + onetwelthx;
            var point2y = this.topy + sixtypery;
            this.polygon = this.polygon + '' + point2x + ',' + point2y+ ' ';

            var point3x = this.leftx + (this.position+1) * onesixthx;
            var point3y = bottomy;
            this.polygon = this.polygon + '' + point3x + ',' + point3y;


        } else {
            // TRIANGLE
            var point1x = this.leftx + (this.position-12) * onesixthx;
            var point1y = topy;
            this.polygon = '' + point1x + ',' + point1y + ' ';

            var point2x = this.leftx + ((this.position-12) * onesixthx)  + onetwelthx;
            var point2y = this.topy + fortypery;
            this.polygon = this.polygon + '' + point2x + ',' + point2y+ ' ';

            var point3x = this.leftx + ((this.position-12)+1) * onesixthx;
            var point3y = topy;
            this.polygon = this.polygon + '' + point3x + ',' + point3y;
        }
        
    }

}