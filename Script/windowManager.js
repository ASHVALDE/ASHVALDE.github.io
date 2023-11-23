
var moving = null;
var offset = [0, 0]
function initialClick(e) {
  if (e.target.classList.contains("title-bar")) {
    offset[0] = e.offsetX
    offset[1] = e.offsetY
    moving = e.target;
    document.onpointerup = soltarClick
    document.addEventListener("pointermove", move, false);
    document.getElementById("Menu").classList.remove("Menu-Inicio-Activo")

  } else if (e.target.classList.contains("closewindowsbutton")) {
    e.target.parentElement.parentElement.parentElement.remove()
    document.getElementById("Menu").classList.remove("Menu-Inicio-Activo")

  }else if(e.target.classList.contains("flex-container-Menu-Item")){
    document.getElementById("Menu").classList.remove("Menu-Inicio-Activo")

  }
  else if (e.target.classList.contains("escritorio")) {
    const currentActive = document.getElementById("iconActive")
    document.getElementById("Menu").classList.remove("Menu-Inicio-Activo")
    if (currentActive) {
      currentActive.id = ""
    }
  }else if(e.target.id=="startButton"){
    document.getElementById("Menu").classList.toggle("Menu-Inicio-Activo")
    console.log()
  }
  
}




function move(e) {
  var newX = e.clientX - 10;
  var newY = e.clientY - 10;
  moving.parentElement.style.left = newX - offset[0] + "px";
  moving.parentElement.style.top = newY - offset[1] + "px";
}

function soltarClick(e) {
  document.removeEventListener("pointermove", move, false);

  document.onpointerup = null
  moving = false

}
document.onpointerdown = initialClick

async function loadPage(pagina) {
  const x = await fetch(pagina, {
    // 👇️ set Accept header to `text/html`
    headers: {
      Accept: 'text/html',
    },
  })
  return x.text()
}


async function createWindow(title, link, x, y) {
  const txt = await loadPage(link)
  let elem = document.createElement("window")
  elem.innerHTML = "<div class='window' style='position:absolute;width:min-content;text-align: center;top:" + y + "px;left:" + x + "px;' ><div id='title-bar1' class='title-bar' style='user-select: none;'><div class='title-bar-text'>" + title + "</div><div class='title-bar-controls'><button aria-label='Minimize'></button><button aria-label='Maximize'></button><button class='closewindowsbutton' aria-label='Close'></button></div></div><div class='window-body'><div>" + txt + "</div> </div></div></div>"
  document.body.append(elem.firstChild)
}

