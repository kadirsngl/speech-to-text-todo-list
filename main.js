let speakBtn = document.getElementById("letsSpeakBtn");
let inputText = document.getElementById("inputText")
let container = document.getElementById("container")
let containerBtn = document.getElementById("containerBtn" )
let toDoContainer = document.getElementById("toDoContainer")
let recognition = new webkitSpeechRecognition() || speechRecognition();
let stopBtn = document.createElement("button");
let toDoParagraph;
let checkbox;

document.addEventListener( "DOMContentLoaded", function(){
    loadTodo()
})

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

function createElement(todoItem){
    let toDoList = document.createElement("div");
    toDoParagraph = document.createElement("input");
    checkbox = document.createElement("input");
    checkbox.type="checkbox";
    let clearBtn = document.createElement("button");

    toDoParagraph.value = todoItem ?  todoItem.todo : ""
    checkbox.checked = todoItem ? todoItem.isCompleted : false

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
    addTodo()
    stopBtn.remove();
})

function addTodo() {
    let todoData = {
        todo: inputText.value,
        id: Date.now(),
        isCompleted: false
    }
    createElement(todoData)
    saveTodo()
    inputText.value = ""
}

function saveTodo() {
    let todos = []
    document.querySelectorAll(".toDoList").forEach(function(toDoList) {
    let toDoParagraph = toDoList.querySelector(".toDoParagraph");
    let checkbox = toDoList.querySelector(".checkbox");
    todos.push({
        todo: toDoParagraph.value,
        id: Date.now(),
        checkbox: checkbox.checked,
        
    })
    })
    localStorage.setItem('todoData', JSON.stringify(todos))
};

function loadTodo() {
    let todos = JSON.parse(localStorage.getItem('todoData')) || [];
    todos.forEach(createElement)
}