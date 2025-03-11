const todoList = [];

function renderTodoList() {
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++) {
       const todo = todoList[i];
       const name = todo.name;
       const date = todo.date;
       
       const html = 
       `<p> 
        ${todo.name} ${todo.date} 
        <button 
            onclick = deleteTodo(${i})
            ">delete 
        </button> 
        </p>`;
       todoListHTML += html;
    }
    document.getElementById('todo').innerHTML = todoListHTML;
}

function addTodo() {
    const x = document.querySelector('.todo-class').value;
    const y = document.querySelector('.date-class').value;
    todoList.push({name:x, date:y});
    console.log(todoList);    
    renderTodoList();   
}

function deleteTodo(index) {
    todoList.splice(index,1);
    renderTodoList();
}