class ShapeInfo {
    _x:number;
    _y:number;
    _width:number;
    _height:number;
    _color:string;
    _alpha:number;
    _name:string;
    _code:number;//hash

    public constructor(x,y,width,height,color,alpha,name) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
        this._alpha = alpha;
        this._name = name;
        console.log("-----------CreateCode:" + this._code);

    }
    
}


class ResourceDisplayObject {

    type:number;
    name:engine.TextField;
    content:ShapeInfo;
    picture:engine.DisplayObject;
    panel:engine.DisplayObjectContainer;
    drugPictrue:engine.DisplayObject;
    
    
    width:number = 100;
    height:number = 100;;

    public constructor(name:string,pic:engine.DisplayObject,content:ShapeInfo) {

        this.name = new engine.TextField();
        this.name.text = name;
        this.name.scaleX*=2;
        this.name.scaleY*=2;
        this.name.x = 15;
        this.name.y = 80;
    
        this.picture = pic;
        this.content = content;

        pic.touchEnabled = true;
        
        this.panel = new engine.DisplayObjectContainer();
        this.panel.touchEnabled = true;
        this.panel.addChild(this.picture);
        this.panel.addChild(this.name);

        this.panel.touchEnabled = true;

    }

    public onMouseDown(e:MouseEvent) {
        selectObject = this;
        //console.log(selectObject.name.text + " select");
        object_x = this.panel.x;
        object_y = this.panel.y;
        mouse_x = e.offsetX;
        mouse_y = e.offsetY;

    }

}

var displayList:ResourceDisplayObject[] = [];


var _stage:engine.DisplayObjectContainer;//全舞台
var _main:any;

var width = 1400;
var height = 150;
var pos_x = 0;
var pos_y = 740;
var color = Marker.color.white;

var resourcePanel:GUI.Panel;//内部舞台

var selectObject:ResourceDisplayObject  = null;
var object_x:number = null;
var object_y:number = null;

var mouse_x:number = null;
var mouse_y:number = null;

var code:number = 0;//hash


export function getStage(stage:engine.DisplayObjectContainer){
    _stage = stage;
}

export function getMain(main:any){
    _main = main;
}


export function createList():ResourceDisplayObject[] {
    var list:ResourceDisplayObject[] = [];

    var rect_1 = new engine.Shape();
    rect_1.graphics.beginFill(Marker.color.darkblue,1);
    rect_1.graphics.drawRect(0,0,80,80);
    rect_1.graphics.endFill();

    var name_1 = "Rect_1";

    var object_1 = new ResourceDisplayObject(name_1,rect_1,new ShapeInfo(0,0,80,80,Marker.color.darkblue,1,name_1)); 
    object_1.panel.addEventListener(engine.TouchEvent.TOUCH_BEGIN,object_1.onMouseDown,object_1);

    list.push(object_1);


    var rect_2 = new engine.Shape();
    rect_2.graphics.beginFill(Marker.color.grey,1);
    rect_2.graphics.drawRect(0,0,80,80);
    rect_2.graphics.endFill();

    var name_2 = "Rect_2";

    var object_2 = new ResourceDisplayObject(name_2,rect_2,new ShapeInfo(0,0,80,80,Marker.color.grey,1,name_2));
    object_2.panel.addEventListener(engine.TouchEvent.TOUCH_BEGIN,object_2.onMouseDown,object_2); 

    list.push(object_2);
    

    console.log("ResourceList Create");
    return list;
}

export function loadResource(list:ResourceDisplayObject[]) {
    displayList = list;

    var width = 30;
    var height = 30;
    
    for(let object of displayList) {
        object.panel.y += height;
        object.panel.x += width;
        resourcePanel.panel.addChild(object.panel);
        width += 110;
    }

    console.log("ResourceList Load");

}


export function createPanel() {

    resourcePanel = new GUI.Panel(width,height,color,1);
    resourcePanel.panel.x = pos_x;
    resourcePanel.panel.y = pos_y;
    resourcePanel.stroke(Marker.color.black,Marker.stroke_width);
    resourcePanel.panel.touchEnabled = true;
    _stage.addChild(resourcePanel.panel);
    console.log("ResourcePanel Created");

    resourcePanel.panel.addEventListener(engine.TouchEvent.TOUCH_BEGIN,onMouseDown,this);
    resourcePanel.panel.addEventListener(engine.TouchEvent.TOUCH_MOVE,onMouseMove,this);
    resourcePanel.panel.addEventListener(engine.TouchEvent.TOUCH_END,onMousUp,this);

}


export function onMouseDown(e:MouseEvent) {
    console.log("Object " + selectObject.name.text + " Select");
    var content = new ShapeInfo(selectObject.content._x,selectObject.content._y,selectObject.content._width,selectObject.content._height,selectObject.content._color,selectObject.content._alpha,selectObject.content._name);
    _main.receiveResource(content);
}

export function onMouseMove(e:MouseEvent) {
    selectObject.panel.x -= (mouse_x - e.offsetX);
    selectObject.panel.y -= (mouse_y - e.offsetY);
    mouse_x = e.offsetX;
    mouse_y = e.offsetY;

    

}  

export function onMousUp(e:MouseEvent) {
    console.log("Object " + selectObject.name.text + " Destroy");
    selectObject.panel.x = object_x;
    selectObject.panel.y = object_y;
    selectObject = null;
    _main.createObject();
    
}



export function init() {
    createPanel();
    var list = createList();
    loadResource(list);

    console.log("ResourceProcess Created");
}