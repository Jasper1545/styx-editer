var _stage:engine.DisplayObjectContainer;


var width = 1400;
var height = 100;
var pos_x = 0;
var pos_y = 40;

var color = Marker.color.grey;

export function getStage(stage:engine.DisplayObjectContainer){
    _stage = stage;
}

function createPanel() {

    var middleMenuPanel = new GUI.Panel(width,height,color,1);
    middleMenuPanel.panel.x = pos_x;
    middleMenuPanel.panel.y = pos_y;
    middleMenuPanel.stroke(Marker.color.black,Marker.stroke_width);
    _stage.addChild(middleMenuPanel.panel);
    console.log("MiddleMenuPanel Created");

}

export function init() {
    createPanel();
    console.log("MiddleMenuProcess Created");
}