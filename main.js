let speakBtn = document.getElementById("letsSpeakBtn");
let inputText = document.getElementById("inputText")
let container = document.getElementById("container")
let containerBtn = document.getElementById("containerBtn" )
let toDoContainer = document.getElementById("toDoContainer")
let recognition = new webkitSpeechRecognition() || speechRecognition();
let stopBtn = document.createElement("button");
let toDoParagraph;
let checkbox;

recognition.interimResults = true;
recognition.continuous = true;
recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    inputText.textContent = result;
};

function startListening(){
    speakBtn.value = "Listening..";
    speakBtn.style.backgroundColor = "orange";
    speakBtn.style.fontSize ="20px"
    
    containerBtn.appendChild(stopBtn);
    stopBtn.setAttribute('class', 'stopBtn');
    stopBtn.textContent= "STOP";
    recognition.start();
}

function stopListening(){
    speakBtn.value = "LET'S SPEAK";
    speakBtn.style.fontSize = "16px";
    speakBtn.style.backgroundColor = "#00E0FF";
    recognition.stop();
}

function createElement(){
    let toDoList = document.createElement("div");
    toDoParagraph = document.createElement("input");
    checkbox = document.createElement("input");
    checkbox.type="checkbox";
    let clearBtn = document.createElement("button");

    toDoList.setAttribute("class", "toDoList")
    toDoParagraph.setAttribute("class","toDoParagraph");
    checkbox.setAttribute("class","checkbox");
    clearBtn.setAttribute("class","clearBtn");
    clearBtn.innerHTML = "Clear"
    
    toDoContainer.appendChild(toDoList);
    toDoList.appendChild(toDoParagraph);
    toDoList.appendChild(checkbox);;
    toDoList.appendChild(clearBtn);

    clearBtn.addEventListener("click", function() {
        toDoList.remove(toDoList);
        localStorage.removeItem("todoData");
    });
}




speakBtn.addEventListener("click", function(){
    startListening()
})

stopBtn.addEventListener( "click", function(){
    stopListening()
    createElement()

    toDoParagraph.value = inputText.value
    
    stopBtn.remove();
    inputText.value=""

    let todoData = JSON.stringify(toDoParagraph.value);

    let array = []
    let todoDate = {
        todo: toDoParagraph.value,
        createdAt: new Date().toLocaleString(),
        isCompleted : checkbox.checked
    }
    array.push(todoDate)
    localStorage.setItem("todoData",JSON.stringify(array));
    
    checkbox.addEventListener("change",function() {
        if (this.checked) {
            toDoParagraph.style.textDecoration = "line-through";
        } else {
            toDoParagraph.style.textDecoration = "none";
        }
    });

    clearBtn.addEventListener("click", function() {
        toDoList.remove(toDoList);
        localStorage.removeItem("todoData");
    });
})

document.addEventListener("DOMContentLoaded", (e)=> {
    let jsonParse = JSON.parse(localStorage.getItem("todoData"));
    
    for (let item of jsonParse) {
        
        console.log(item.todo);
        
          }
    if (jsonParse) {
        stopListening()
        createElement()
    
        toDoParagraph.value = jsonParse
        
        checkbox.addEventListener("change",function() {
            if (this.checked) {
                toDoParagraph.style.textDecoration = "line-through";
            } else {
                toDoParagraph.style.textDecoration = "none";
            }
        });

        clearBtn.addEventListener("click", function() {
            toDoList.remove(toDoList);
            localStorage.removeItem("todoData");
        });
    }
})