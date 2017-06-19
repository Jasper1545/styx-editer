namespace GUI {

    export class Panel {

        public panel:engine.DisplayObjectContainer;
        width:number;
        height:number;
        

        public constructor(width:number,height:number,color:string,alpha:number) {
            
            this.panel = new engine.DisplayObjectContainer();
            this.width = width;
            this.height = height;
            this.panel.touchEnabled = true;

            var rect = new engine.Shape();
            rect.graphics.beginFill(color,1);
            rect.graphics.drawRect(0,0,width,height);
            rect.graphics.endFill();
            rect.touchEnabled = true;
            
            this.panel.addChild(rect);

        }

        public stroke(color:string,width:number) {

            var line_1 = new engine.Shape();
            line_1.graphics.beginFill(color,1);
            line_1.graphics.drawRect(0,0,this.width,width);
            line_1.graphics.endFill();

            var line_2 = new engine.Shape();
            line_2.graphics.beginFill(color,1);
            line_2.graphics.drawRect(0,0,width,this.height);
            line_2.graphics.endFill();

            var line_3 = new engine.Shape();
            line_3.graphics.beginFill(color,1);
            line_3.graphics.drawRect(0,this.height-width,this.width,width);
            line_3.graphics.endFill();

            var line_4 = new engine.Shape();
            line_4.graphics.beginFill(color,1);
            line_4.graphics.drawRect(this.width-width,0,width,this.height);
            line_4.graphics.endFill();

            this.panel.addChild(line_1);
            this.panel.addChild(line_2);
            this.panel.addChild(line_3);
            this.panel.addChild(line_4);

        }


    }

}