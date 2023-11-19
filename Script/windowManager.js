
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

async function loadPage(pagina) {
    const x = await fetch(pagina, {
      // 👇️ set Accept header to `text/html`
      headers: {
        Accept: 'text/html',
      },
    })
    return x.text()
  }


async function createWindow(title,link){
     const txt = await loadPage("hola.html")
    let elem = document.createElement("window")
    elem.innerHTML = "<div class='window pres1' style='width:min-content;text-align: center;' ><div id='title-bar1' class='title-bar' style='user-select: none;'><div class='title-bar-text'>"+title+"</div><div class='title-bar-controls'><button aria-label='Minimize'></button><button aria-label='Maximize'></button><button class='closewindowsbutton' aria-label='Close'></button></div></div><div class='window-body'><div>"+txt+"</div> </div></div></div>"
    document.body.append(elem.firstChild)
}
