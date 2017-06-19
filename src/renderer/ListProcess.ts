var _stage:engine.DisplayObjectContainer;
var _main:any;
var _preview:any;

var width = 300;
var height = 600;
var pos_x = 0;
var pos_y = 140;

var color = Marker.color.lightblue;

var listPanel:GUI.Panel;
var listView:engine.DisplayObjectContainer;

class ListObject {
    rect:engine.Shape;
    text:engine.Shape;
    tf:engine.TextField;
    content:any;
    container:engine.DisplayObjectContainer;

    public constructor(rect,text,tf,container,content,x,y) {
        this.rect = rect;
        this.text = text;
        this.tf = tf;
        this.container = container;
        this.content = content;

        this.container.addChild(this.rect);
        this.container.addChild(this.text);
        this.container.addChild(this.tf);
        this.container.x = x;
        this.container.y = y;

        this.rect.touchEnabled = true;
        this.text.touchEnabled = true;
        this.tf.touchEnabled = true;
        this.container.touchEnabled = true;

        this.container.addEventListener(engine.TouchEvent.TOUCH_TAP,this.onSelect,this);

    }

    public onMouseSelect(e:MouseEvent) {
        console.log("!!!!!!!!~~~~~~~~~~~~~~");
        this.onSelect();
    }

    public onSelect() {
        for(let previewObject of _preview.previewObjectList) {
            if(this.content._code == previewObject.content._code) {
                console.log("List Select");
                previewObject.onSelect();
            }
        }
    }

}

export function getStage(stage:engine.DisplayObjectContainer) {
    _stage = stage;
}

export function getMain(main:any) {
    _main = main;
}

export function getPreview(preview:any) {
    _preview = preview;
}

function createPanel() {

    listPanel = new GUI.Panel(width,height,color,1);
    listPanel.panel.x = pos_x;
    listPanel.panel.y = pos_y;
    listPanel.stroke(Marker.color.black,Marker.stroke_width);
    _stage.addChild(listPanel.panel);
    console.log("ListPanel Created");
    listPanel.panel.touchEnabled = true;

}

export function init() {
    createPanel();
    listView = new engine.DisplayObjectContainer();
    listView.touchEnabled = true;
    listPanel.panel.addChild(listView);
    console.log("ListProcess Created");
}

export function update() {
    var x:number = 0;
    var y:number = 0;
    var color:string = null;

    listView.children = [];

    for(let content of _main.displayList) {
        console.log("List Update" + x);
        color = changeColor(color);

        var rect = new engine.Shape();
        rect.graphics.beginFill(color,1);
        rect.graphics.drawRect(0,0,300,40);
        rect.graphics.endFill();
        //listView.addChild(rect);

        var text = new engine.Shape();
        text.graphics.beginFill(Marker.color.black,1);
        text.graphics.drawRect(0,0,0,0);
        text.graphics.endFill();

        var tf = new  engine.TextField();
        tf.text = content._name;
        tf.scaleX = 2;
        tf.scaleY = 2;
        tf.x = 30;
        tf.y = 8; 
        console.log("Text Name:" + tf.text);

        var container = new engine.DisplayObjectContainer();
        var listObject = new ListObject(rect,text,tf,container,content,x,y);
        

        listView.addChild(listObject.container);

        y += 40;

    }
}

export function changeColor(color:string):string {
    if(color == Marker.color.grey){
        console.log("blue");
        color = Marker.color.white;
    }else {
        console.log("grey");
        color = Marker.color.grey;
    }

    return color;
}
