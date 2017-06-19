var canvas = document.getElementById("app") as HTMLCanvasElement;
export var textArea = document.getElementById("inputText") as HTMLTextAreaElement;
var stage = engine.run(canvas);

export var stateSign:number;
var listProcess:any;
var previewProcess:any;
var propertyProcess:any;
var resourceProcess:any;

export var displayList:any[] = []; //数据表
var resObject:any;

var undoList:Function[] = [];
var reDoList:Function[] = [];

var code:number = 0;

export function outStage():engine.DisplayObjectContainer {
    return stage;
}

export function getList(process:any) {
    listProcess = process;
}

export function getPreview(process:any) {
    previewProcess = process;
}

export function getProperty(process:any) {
    propertyProcess = process;
}

export function getResource(process:any) {
    resourceProcess = process;
}

export function receiveResource(res:any) {
    resObject = res;
    stateSign = Marker.processState.loadResource;
    console.log("Ready to Create Object " + res._name);
}

export function createObject() {
    resObject._code = code;
    code++;
    //console.log("Create Object name:" + resObject._code);
    
    displayList.push(resObject);
    for(let content of displayList) {
        console.log("Id:" + content._code + " x:" + content._x + " y:" + content._y + " w:" + content._width + " h:" + content._height);
    }
    
    previewProcess.update();
    listProcess.update();
    resObject = null;

}

export function update() {
    previewProcess.update();
    listProcess.update();
    propertyProcess.update();
}

export function init() {
    textArea.value = "aaaaaa";
    console.log("value: " + textArea.value + " !!!!!!!!!!!!!!!!!!!!!!!!");
    stage.touchEnabled = true;
    console.log("MainProcess Created");
}

export function draw() {
    var rect_1 = new engine.Shape();
    rect_1.graphics.beginFill(Marker.color.white,1);
    rect_1.graphics.drawRect(0,0,80,80);
    rect_1.graphics.endFill();

    rect_1.touchEnabled = true;

    stage.addChild(rect_1);
    console.log("draw");

}

