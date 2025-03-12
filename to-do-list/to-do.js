const todoList = [];

function renderTodoList() {
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++) {
       const todo = todoList[i];
       const {name, date} = todo;
       
       const html = 
       ` <div>  ${name} </div>
         <div> ${date} </div>
     
        <button 
            class="delete-class js-delete-button"
            >delete 
        </button> 
        `;
       todoListHTML += html;
    }
    document.querySelector('.todo').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            deleteTodo(index);
        });
    });
}

document.querySelector('.js-add-button').addEventListener('click', () => {
    addTodo();
});

function addTodo() {
    const x = document.querySelector('.todo-class').value;
    const y = document.querySelector('.date-class').value;
    todoList.push({name:x, date:y});   
    renderTodoList();   
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}