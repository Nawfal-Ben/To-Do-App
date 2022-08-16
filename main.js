// Variables
let taskToAdd = document.querySelector("input")
let add = document.querySelector(".add")
let tasks = document.querySelector(".tasks")

let arrOfTasks = []

if (localStorage.getItem("tasks")) {
    arrOfTasks = JSON.parse(localStorage.getItem("tasks"))
    ToWebPage(arrOfTasks)
}

add.addEventListener("click", function () {
    if (taskToAdd.value !== "" && !taskExists(taskToAdd.value)) {
        // Create Task Object and add it to the array of tasks
        arrOfTasks.push({
            id: Date.now(),
            title: taskToAdd.value,
            completed: false,
        })
        setToLocalStorage(arrOfTasks)
        ToWebPage(arrOfTasks)
    }
})

function setToLocalStorage(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr))
}

function ToWebPage(arrOfTasks) {
    tasks.innerHTML = ""
    arrOfTasks.forEach((e) => {
        let p = document.createElement('p')
        let span = document.createElement('span')
        span.append("Delete")
        span.className = "del"
        p.append(e.title, span)
        if (e.completed) p.className = "done"
        tasks.append(p)

        // Manipulate Task
        p.onclick = function () {
        p.classList.toggle("done")
        arrOfTasks.forEach((e) => {
            if (e.title === p.firstChild.textContent) {
                e.completed ? e.completed = false : e.completed = true
            }
        })
        setToLocalStorage(arrOfTasks)
        }

        // Remove Task
        span.onclick = function () {
            span.parentElement.remove()
            arrOfTasks.forEach((e, i , arr) => {
                if (e.title === span.previousSibling.textContent) {
                    arr.splice(i, 1)
                }
            })
            setToLocalStorage(arrOfTasks)
        }
    })
    taskToAdd.value = ""
}

function taskExists(task) {
    for (let i = 0; i < arrOfTasks.length; i++) {
        if (arrOfTasks[i].title === task) return true
    }
}