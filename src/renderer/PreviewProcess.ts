var _stage:engine.DisplayObjectContainer;
var _main:any = null;
var _property:any = null;
export var previewPanel:GUI.Panel;

var width = 800;
var height = 600;
var pos_x = 1400/2 - width/2;
var pos_y = 1080/2 - height/2 - 100;

var color = Marker.color.white;
var strokeColor = Marker.color.black;

var selectObject:PreviewObject = null;

var stroke_width:number = 3;

export function getStage(stage:engine.DisplayObjectContainer){
    _stage = stage;
}

export function getMain(main:any) {
    _main = main;
}

export function getProperty(property:any){
    _property = property;
}

export var previewObjectList:PreviewObject[] = [];
var previewStage:engine.DisplayObjectContainer;

class PreviewObject {
    panel:engine.DisplayObjectContainer;
    strokePanel:engine.DisplayObjectContainer;
    shape:engine.DisplayObject;
    content:any;
    public constructor(shape:engine.DisplayObject,content:any) {
        this.panel = new engine.DisplayObjectContainer();
        this.panel.touchEnabled = true;
        this.strokePanel = new engine.DisplayObjectContainer();
        this.strokePanel.touchEnabled = true;
        this.shape = shape;
        this.content = content;
        this.panel.addChild(shape);
        this.panel.x = this.content._x;
        this.panel.y = this.content._y;     
        
        this.panel.addEventListener(engine.TouchEvent.TOUCH_TAP,this.onMouseSelect,this);//----------------

    }

    public onMouseSelect(e:MouseEvent) {
        this.onSelect();

    }

    public onSelect() {
        unselectAll();
        console.log("code:" + this.content._code + " select");
        this.stroke();
        selectObject = this;
        console.log("selectObject Code :" + selectObject.content._code);
        this.panel.removeEventListener(engine.TouchEvent.TOUCH_TAP,this.onMouseSelect,this);
        this.panel.addEventListener(engine.TouchEvent.TOUCH_MOVE,this.onMouseDrug,this);
        _property.notify(this.content);
    }

    public onMouseDrug(e:MouseEvent) {

        var _content = null;

        for(let content of _main.displayList) {
            if(content._code == this.content._code) {
                _content = content;
                break;
            }
        }

        _content._x = e.offsetX - pos_x;
        _content._y = e.offsetY - pos_y;

        this.content = _content;
        
        this.panel.x = this.content._x;
        this.panel.y = this.content._y;

        _property.notify(this.content);

        //update();//redraw
    }

    public unSelect() {
        _property.hideInfo();
        this.panel.removeChild(this.strokePanel);   
        this.panel.removeEventListener(engine.TouchEvent.TOUCH_MOVE,this.onMouseDrug,this);
        this.panel.addEventListener(engine.TouchEvent.TOUCH_TAP,this.onMouseSelect,this);
    }

    public stroke() {

        console.log("stroke");
        console.log("w:" + this.content._width +"h" + this.content._height);

        var line_1 = new engine.Shape();
        line_1.graphics.beginFill(strokeColor,1);
        line_1.graphics.drawRect(0,0,this.content._width,stroke_width);
        line_1.graphics.endFill();

        var line_2 = new engine.Shape();
        line_2.graphics.beginFill(strokeColor,1);
        line_2.graphics.drawRect(0,0,stroke_width,this.content._height);
        line_2.graphics.endFill();

        var line_3 = new engine.Shape();
        line_3.graphics.beginFill(strokeColor,1);
        line_3.graphics.drawRect(0,this.content._height-stroke_width,this.content._width,stroke_width);
        line_3.graphics.endFill();

        var line_4 = new engine.Shape();
        line_4.graphics.beginFill(strokeColor,1);
        line_4.graphics.drawRect(this.content._width-stroke_width,0,stroke_width,this.content._height);
        line_4.graphics.endFill();

        this.strokePanel.addChild(line_1);
        this.strokePanel.addChild(line_2);
        this.strokePanel.addChild(line_3);
        this.strokePanel.addChild(line_4);

        this.panel.addChild(this.strokePanel);
    }


}

function createPanel() {

    previewPanel = new GUI.Panel(width,height,color,1);
    previewPanel.panel.x = pos_x;
    previewPanel.panel.y = pos_y;
    previewPanel.panel.touchEnabled = true;
    previewPanel.stroke(Marker.color.black,Marker.stroke_width);
    previewPanel.panel.touchEnabled = true;
    _stage.addChild(previewPanel.panel);

    previewStage = new engine.DisplayObjectContainer();
    previewPanel.panel.addChild(previewStage);
    previewStage.touchEnabled = true;
    previewPanel.panel.children[0].addEventListener(engine.TouchEvent.TOUCH_TAP,tapToUnselect,this);

    console.log("PreviewPanel Created");

}

export function init() {
    createPanel();
    console.log("PreviewProcess Created");
}

export function update() {
    console.log("Preview Update");

    previewStage.children = [];
    console.log("!!!!!!!!!!!!!!!!!!! length:" + _main.displayList.length);

    for(let content of _main.displayList) {
        //console.log("Id:" + content._code + " x:" + content._x + " y:" + content._y + " w:" + content._width + " h:" + content._height);
        
        var rect = new engine.Shape();
        rect.graphics.beginFill(content._color,content._alpha);
        rect.graphics.drawRect(0,0,content._width,content._height);
        rect.graphics.endFill();
        rect.touchEnabled = true;

        //
        var object = new PreviewObject(rect,content);
        previewObjectList.push(object);
        previewStage.addChild(object.panel);
        //
        //previewPanel.panel.addChild(rect);

    }


}

export function tapToUnselect(e:MouseEvent) {
    unselectAll();
}

export function unselectAll() {
    console.log("unselect");
    selectObject = null;
    _property.hideInfo();
    for(let previewObject of previewObjectList) {
        previewObject.unSelect();
    }
}





