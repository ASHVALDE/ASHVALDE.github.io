let x = 2 + Math.floor(Math.random()*2);

let lastEpoch = (Cookies.get("lastTime"))
let loginDisabledCookie = (Cookies.get("loginDisabled"))
let shouldLoad = true;
if(lastEpoch!=null){
    let actualTime = Date.now()/1000
    // Checkea no hayan pasado 2 horas
    if(actualTime-lastEpoch<7200 ){
        shouldLoad = false;
    }
}

if(loginDisabledCookie=="true"){
    console.log(loginDisabledCookie)

    shouldLoad = false;
}


function checkParent(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
     node = node.parentNode;
     }
   return false;
}


if(shouldLoad){
    setTimeout(()=>{
        document.getElementById("loadingContainer").style.visibility="hidden";
    },x*1000)

    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target
        let campoUsuario = document.getElementById("userArea")
        if(checkParent(campoUsuario,target)){

            let isActive = campoUsuario.classList.contains("activeUser")
            if(isActive){
                document.getElementById("loginContainer").style.visibility = "hidden";
                document.getElementById("loginContainer").style.display = "none";
                document.removeEventListener('click',this)
                let epoch = Date.now()/1000
                Cookies.set("lastTime",epoch)
                const audio = new Audio('public/start.mp3');
                audio.play();
            }else{
                campoUsuario.classList.add("activeUser")
            }
        }else{
            let isActive = campoUsuario.classList.contains("activeUser")
            if(isActive){
                campoUsuario.classList.remove("activeUser")
            }
        }
    }, false);
}else{
    document.getElementById("loadingContainer").style.visibility="hidden";
    document.getElementById("loginContainer").style.visibility = "hidden";
    document.getElementById("loginContainer").style.display = "none";

}

