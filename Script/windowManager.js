
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

let paginasAbiertas = {

}

async function createWindow(title, link, x, y) {
  if(paginasAbiertas[title]){
    bringAppFront(title)
  }else{
    const txt = await loadPage(link)
    let elem = document.createElement("window")
    elem.innerHTML = "<div class='window' style='position:absolute;width:min-content;text-align: center;top:" + y + "px;left:" + x + "px;' ><div id='title-bar1' class='title-bar' style='user-select: none;'><div class='title-bar-text'>" + title + "</div><div class='title-bar-controls'><button onpointerdown=hideThisWindow('"+ title.replace(/ /g, '_') +"') aria-label='Minimize'></button><button class='closewindowsbutton' onpointerdown=closeThisWindow('"+ title.replace(/ /g, '_') +"') aria-label='Close'></button></div></div><div class='window-body'><div>" + txt + "</div> </div></div></div>"
    elem.firstChild.onpointerdown = (e)=>{bringAppFront(title,e)}
    paginasAbiertas[title] = elem.firstChild
    let elemento = document.body.append(elem.firstChild)
    elem.style.zIndex = -3
    createTaskBarButton(title)
    bringAppFront(title)
  }

}
async function createWindow2(title, link, x, y) {
  if(paginasAbiertas[title]){
    bringAppFront(title)
  }else{

    let elem = document.createElement("window")
    elem.innerHTML = "<div class='window' style='position:absolute;width:min-content;text-align: center;top:" + y + "px;left:" + x + "px;' ><div id='title-bar1' class='title-bar' style='user-select: none;'><div class='title-bar-text'>" + title + "</div><div class='title-bar-controls'><button onpointerdown=hideThisWindow('"+ title.replace(/ /g, '_') +"') aria-label='Minimize'></button><button class='closewindowsbutton' onpointerdown=closeThisWindow('"+ title.replace(/ /g, '_') +"') aria-label='Close'></button></div></div><div class='window-body'><div>" +
     "<iframe width='800' height='480' src='https://www.google.com/webhp?hl=es&sa=X&ved=0ahUKEwjT44qnyquFAxVvRTABHYakD5sQPAgJ'></iframe>" +
     "</div> </div></div></div>"
    elem.firstChild.onpointerdown = (e)=>{bringAppFront(title,e)}
    paginasAbiertas[title] = elem.firstChild
    document.body.append(elem.firstChild)
    createTaskBarButton(title)
    bringAppFront(title)
  }

}

function closeThisWindow(e){
  const title = e.replace(/_/g, " ")
  paginasAbiertas[title].remove()
  document.getElementById("Menu").classList.remove("Menu-Inicio-Activo")
  document.getElementById(title+"_Taskbar").remove()
  delete paginasAbiertas[title]
}

function hideThisWindow(e){
  const title = e.replace(/_/g, " ")

  paginasAbiertas[title].style.visibility = 'hidden';
  console.log(paginasAbiertas[title].style.visibility)
  

}

function createTaskBarButton(title){
  let newButton = document.createElement("window")
  
  newButton.innerHTML = "<button style='height:100%;margin-left:5px;' id='"+title+"_Taskbar'><img style='margin-right: 5px; height:50%;' src='apps/"+title+"/icon.png'>  "+title+"</button>"


  newButton.firstChild.onpointerdown = ()=>{bringAppFront(title)}

  document.getElementById("taskbarIcons").append(newButton.firstChild)


}


function bringAppFront(title,e){
 
  console.log(title)
  if (e && e.target.tagName=="BUTTON"){ return false}
  Object.keys(paginasAbiertas).forEach(pagina => {
    paginasAbiertas[pagina].style.zIndex= 0
  });
  paginasAbiertas[title].style.zIndex= 99
  paginasAbiertas[title].style.visibility = "visible";

}

window.addEventListener('message', function(event) {
 if(event.data[0]=="mouseup"){
  return soltarClick()
 }

});