var programs = ["Sobre Mi","Proyectos","Buscaminas","Configuraciones"]
var icons  = document.getElementsByClassName("icon")
var currentActive = null
const startIcon = (e)=>{
    currentActive = document.getElementById("iconActive")

    if(e.id=="iconActive"){
        const appname = e.getElementsByTagName("p")[0].innerText
        createWindow(appname,"../apps/"+appname+"/data.html")
        currentActive.id=""

    }
    if(currentActive){
        currentActive.id=""
    }
    e.id = "iconActive"
}
const startIconWithURL = (e,url)=>{
    currentActive = document.getElementById("iconActive")

    if(e.id=="iconActive"){
        const appname = e.getElementsByTagName("p")[0].innerText
        window.open(url,'_blank');
        currentActive.id=""

    }
    if(currentActive){
        currentActive.id=""
    }
    e.id = "iconActive"
}

function createIcons(){
    programs.forEach((program)=>{
        let elem = document.createElement("window")
        elem.innerHTML = "<div class='icon' onclick='startIcon(this)'><img src='apps/"+program+"/icon.png'><div class='Iconnametag'><p>"+program+"</p></div></div>"
        document.getElementById("escritorio") .append(elem.firstChild)
    })
        
    

    
}


function setWallpaper(e){
    let id = 0
    if(e){
        id= e.value
    }
    let x = localStorage.wallpaper
    if(!x || id){
        localStorage.wallpaper = id || 0
    }
    switch (localStorage.wallpaper) {
        case "5":
            document.getElementsByClassName("escritorio")[0].style.backgroundImage = 'url("../public/images/background5.jpg")'
            break;
        case "4":
            document.getElementsByClassName("escritorio")[0].style.backgroundImage = 'url("../public/images/background4.jpg")'
            break;
        case "3":
            document.getElementsByClassName("escritorio")[0].style.backgroundImage = 'url("../public/images/background2.jpg")'
            break;
        case "2":
            document.getElementsByClassName("escritorio")[0].style.backgroundImage = 'url("../public/images/background.jpg")'
            break;
        case "1":
            document.getElementsByClassName("escritorio")[0].style.backgroundImage = 'none'
            break;
    
        default:
            break;
    }
}
setWallpaper()
createIcons()
