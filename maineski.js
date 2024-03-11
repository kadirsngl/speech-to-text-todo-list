let speakBtn = document.getElementById("letsSpeakBtn");
let inputText = document.getElementById("inputText")
let container = document.getElementById("container")
let containerBtn = document.getElementById("containerBtn" )
let toDoContainer = document.getElementById("toDoContainer")
let recognition = new webkitSpeechRecognition()  || speechRecognition();

recognition.interimResults = true;
recognition.continuous = true;
recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    inputText.textContent = result;
};

let stopBtn = document.createElement("button");

speakBtn.addEventListener("click", function() {
    speakBtn.value = "Listening..";
    speakBtn.style.backgroundColor = "orange";
    speakBtn.style.fontSize ="20px"
    
    containerBtn.appendChild(stopBtn);
    stopBtn.setAttribute('class', 'stopBtn');
    stopBtn.textContent= "STOP";
    recognition.start();
    // speakBtn.disabled = true;  // zaten fonksiyon sırasında butonu deaktif ettiğim için bu koda gerek yok.
})


stopBtn.addEventListener("click", function() {
    speakBtn.value = "LET'S SPEAK";
    speakBtn.style.fontSize = "16px";
    speakBtn.style.backgroundColor = "#00E0FF";
    recognition.stop();
    
    let toDoList = document.createElement("div");
    let toDoParagraph = document.createElement("input");
    let checkbox = document.createElement("input");
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
    
    toDoParagraph.value = inputText.value
    
    stopBtn.remove();
    inputText.value=""

    let jsonString = JSON.stringify(toDoParagraph.value);
    localStorage.setItem("todoData",jsonString);
    
    checkbox.addEventListener("change",function() {
        if (this.checked) {
            toDoParagraph.style.textDecoration = "line-through";
        } else {
            toDoParagraph.style.textDecoration = "none";
        }
    });
    
    clearBtn.addEventListener("click", function() {
        toDoList.remove(toDoList)
        localStorage.removeItem("todoData")
    })
})

// let jsonParse = JSON.parse(localStorage.getItem("todoData"));

document.addEventListener( 'DOMContentLoaded', (e)=> {
    let jsonParse = JSON.parse(localStorage.getItem("todoData"));
    if(jsonParse) {
        let toDoList = document.createElement("div");
        let toDoParagraph = document.createElement("input");
        let checkbox = document.createElement("input");
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
        
        toDoParagraph.value = jsonParse

        checkbox.addEventListener("change",function() {
            if (this.checked) {
                toDoParagraph.style.textDecoration = "line-through";
            } else {
                toDoParagraph.style.textDecoration = "none";
            }
        });
        
        clearBtn.addEventListener("click", function() {
            toDoList.remove(toDoList)
            localStorage.removeItem("todoData")
        })
    }
})