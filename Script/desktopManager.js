var programs = ["Proyectos","Sobre Mi","Sierra"]
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
function createIcons(){
    programs.forEach((program)=>{
        let elem = document.createElement("window")
        elem.innerHTML = "<div class='icon' onclick='startIcon(this)'><img src='apps/"+program+"/icon.png'><div class='Iconnametag'><p>"+program+"</p></div></div>"
        document.getElementById("escritorio") .append(elem.firstChild)
    })
        
    

    
}

createIcons()
