'use strict';
function changeBgRed(){
    document.body.bgColor = "#ff0000";
}
function setBg (color) {
    document.body.bgColor = color;
}
<button onclick="changeBgRed();">背景赤</button>
<button onclick="changeBgBlue(#0000ff);">背景青</button>