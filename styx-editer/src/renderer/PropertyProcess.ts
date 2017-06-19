var _stage:engine.DisplayObjectContainer;
var _main:any;

var width = 300;
var height = 600;
var pos_x = 1100;
var pos_y = 140;

var color = Marker.color.lightblue;

var current_content:any = null;

var propertyPanel:GUI.Panel;
var propertyListPanel:engine.DisplayObjectContainer;

var inputText:string = null;

export function getStage(stage:engine.DisplayObjectContainer){
    _stage = stage;
}

export function getMain(main:any) {
    _main = main;
}   

function createPanel() {

    propertyListPanel = new engine.DisplayObjectContainer();
    propertyListPanel.x = 20;
    propertyListPanel.y = 20;
    propertyListPanel.touchEnabled = true;
    propertyPanel = new GUI.Panel(width,height,color,1);
    propertyPanel.panel.x = pos_x;
    propertyPanel.panel.y = pos_y;
    propertyPanel.stroke(Marker.color.black,Marker.stroke_width);
    _stage.addChild(propertyPanel.panel);
    console.log("PropertyPanel Created");

}

export function notify(content:any) {
    current_content = content;
    update();
}

export function update() {
    propertyListPanel.children = [];
    if(current_content){
        console.log("ShowInfo");
        drawProperList();
    }
}

export function setSize(text:engine.TextField,size:number):engine.TextField{
    text.scaleX = size;
    text.scaleY = size;
    return text;
}

function createButtonX(e:MouseEvent) {
    console.log("TextClick");
    var button = new InputButton("x");
    button.panel.x = this.x + 250;
    button.panel.y = this.y + 10;
    propertyListPanel.addChild(button.panel);
}

function createButtonY(e:MouseEvent) {
    console.log("TextClick");
    var button = new InputButton("y");
    button.panel.x = this.x + 250;
    button.panel.y = this.y + 10;
    propertyListPanel.addChild(button.panel);
}

function createButtonW(e:MouseEvent) {
    console.log("TextClick");
    var button = new InputButton("width");
    button.panel.x = this.x + 250;
    button.panel.y = this.y + 10;
    propertyListPanel.addChild(button.panel);
}

function createButtonH(e:MouseEvent) {
    console.log("TextClick");
    var button = new InputButton("height");
    button.panel.x = this.x + 250;
    button.panel.y = this.y + 10;
    propertyListPanel.addChild(button.panel);
}

export function drawProperList() {
    console.log("drawPRoperty");
    var text = new engine.Shape();
    text.graphics.beginFill(Marker.color.black,1);
    text.graphics.drawRect(0,0,0,0);
    text.graphics.endFill();

    var x = new engine.TextField();
    x.text = "x:" + current_content._x;
    setSize(x,3);
    x.touchEnabled = true;
    x.addEventListener(engine.TouchEvent.TOUCH_TAP,createButtonX,x);
    
    var y = new engine.TextField();
    y.text = "y:" + current_content._y;
    setSize(y,3);
    y.y = 30;
    y.touchEnabled = true;
    y.addEventListener(engine.TouchEvent.TOUCH_TAP,createButtonY,y);

    var width = new engine.TextField();
    width.text = "width:" + current_content._width;
    setSize(width,3);
    width.y = 60;
    width.touchEnabled = true;
    width.addEventListener(engine.TouchEvent.TOUCH_TAP,createButtonW,width);

    var height = new engine.TextField();
    height.text = "height:" + current_content._height;
    setSize(height,3);
    height.y = 90;
    height.touchEnabled = true;
    height.addEventListener(engine.TouchEvent.TOUCH_TAP,createButtonH,height);

    var color = new engine.TextField();
    color.text = "color:" + current_content._color;
    setSize(color,3);
    color.y = 120;

    var alpha = new engine.TextField();
    alpha.text = "alpha:" + current_content._alpha;
    setSize(alpha,3);
    alpha.y = 150;

    var name = new engine.TextField();
    name.text = "name:" + current_content._name;
    setSize(name,3);
    name.y = 180;

    var code = new engine.TextField();
    code.text = "code:" + current_content._code;
    setSize(code,3);
    code.y = 210;

    propertyListPanel.addChild(x);
    propertyListPanel.addChild(y);
    propertyListPanel.addChild(width);
    propertyListPanel.addChild(height);
    propertyListPanel.addChild(color);
    propertyListPanel.addChild(alpha);
    propertyListPanel.addChild(name);
    propertyListPanel.addChild(code);
    
    propertyPanel.panel.addChild(propertyListPanel);
    


}

export function hideInfo() {
    current_content = null;
    propertyListPanel.children = [];
    console.log("HideInfo");
}

export function init() {
    createPanel();
    console.log("PropertyProcess Created");
}


class InputButton {
    public panel:engine.DisplayObjectContainer;
    public button:engine.Shape;
    public type:string;

    public constructor(type:string) {
        this.type = type;
        this.panel = new engine.DisplayObjectContainer();
        this.button = new engine.Shape();
        this.button.graphics.beginFill(Marker.color.white,1);
        this.button.graphics.drawRect(0,0,20,20);
        this.button.graphics.endFill();
        this.panel.addChild(this.button);
        this.panel.touchEnabled = true;
        this.button.touchEnabled = true;
        this.panel.addEventListener(engine.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    public onClick(e:MouseEvent) {
        console.log("ButtonClick");
        switch(this.type) {
            case "x":
                current_content._x = this.getText();
                console.log("X change to :" + current_content._x + "!!!!!!!!!!@@@@@@@@@@@@@@");
                _main.update();
                break;

            case "y":
                current_content._y = this.getText();
                console.log("Y change to :" + current_content._y + "!!!!!!!!!!@@@@@@@@@@@@@@");
                _main.update();
                break;

            case "width":
                current_content._width = this.getText();
                console.log("Width change to :" + current_content._width + "!!!!!!!!!!@@@@@@@@@@@@@@");
                _main.update();
                break;

            case "height":
                current_content._height = this.getText();
                console.log("Height change to :" + current_content._height + "!!!!!!!!!!@@@@@@@@@@@@@@");
                _main.update();
                break;
        }
    }

    public getText():number {
        inputText = _main.textArea.value;
        console.log("getText:" + _main.textArea.value);
        return parseInt(inputText);
    }

}