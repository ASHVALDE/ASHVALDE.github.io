
var moving = null;
var offset = [0,0]
function initialClick(e) {

    if (e.target.classList.contains("title-bar")) {
        offset[0] = e.offsetX
        offset[1] = e.offsetY
        moving = e.target;
        document.onmouseup = soltarClick
        document.addEventListener("mousemove", move, false);
    
    }else if (e.target.classList.contains("closewindowsbutton")){
         e.target.parentElement.parentElement.parentElement.remove()
    }


}

function move(e) {
    var newX = e.clientX - 10;
    var newY = e.clientY - 10;
    moving.parentElement.style.left = newX - offset[0]  + "px";
    moving.parentElement.style.top = newY - offset[1] + "px";
}

function soltarClick(e) {
    console.log("e")
    document.removeEventListener("mousemove", move, false);
    document.onmouseup =null
    moving = false

}
document.onmousedown = initialClick

