var _stage:engine.DisplayObjectContainer;


var width = 1400;
var height = 40;
var pos_x = 0;
var pos_y = 0;

var color = Marker.color.lightblue;

export function getStage(stage:engine.DisplayObjectContainer){
    _stage = stage;
}

function createPanel() {

    var upperMenuPanel = new GUI.Panel(width,height,color,1);
    upperMenuPanel.panel.x = pos_x;
    upperMenuPanel.panel.y = pos_y;
    upperMenuPanel.stroke(Marker.color.black,Marker.stroke_width);
    _stage.addChild(upperMenuPanel.panel);
    console.log("UpperMenuPanel Created");

}

export function init() {
    createPanel();
    console.log("UpperMenuProcess Created");
}