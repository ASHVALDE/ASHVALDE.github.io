function setStyle(e){
    let id;
    if(e){
        id= e.value
    }
    let x = localStorage.style
    if(!x || id){
        localStorage.style = id || 1
    }
    switch (localStorage.style) {

        case "2":
            var link = document.getElementById( "daStyleshit" );

            link.href = "Stylesheet/98.css"

            break;
        case "1":
                var link = document.getElementById( "daStyleshit" );
                link.href = "Stylesheet/XP.css"
            break;
    
        default:
            break;
    }
}
setStyle()