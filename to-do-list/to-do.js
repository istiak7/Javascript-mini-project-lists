const todoList = [];

function renderTodoList() {
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++) {
       const todo = todoList[i];
    //    const name = todo.name;
    //    const date = todo.date;
       const {name, date} = todo;
       
       const html = 
       ` <div>  ${todo.name} </div>
         <div> ${todo.date} </div>
     
        <button class="delete-class"
            onclick = deleteTodo(${i})
            ">delete 
        </button> 
        `;
       todoListHTML += html;
    }
    document.querySelector('.todo').innerHTML = todoListHTML;
}

function addTodo() {
    const x = document.querySelector('.todo-class').value;
    const y = document.querySelector('.date-class').value;
    todoList.push({name:x, date:y});   
    renderTodoList();   
}

function deleteTodo(index) {
    todoList.splice(index,1);
    renderTodoList();
}