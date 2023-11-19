let buttonValue = false
let button = document.getElementById("startButton")

document.onclick = (e)=>{
    if(e.target.id =="startButton"){
        buttonValue= !buttonValue
    }else{
        buttonValue=false
    }


    if(buttonValue){
        button.src = "./public/images/start_2.png"
    }else{
        button.src = "./public/images/start_1.png"

    }
}