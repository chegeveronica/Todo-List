//selectors
const todoinput=document.querySelector(".todo-input");
const todobutton=document.querySelector(".todo-button");
const todolist=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//Event listeners
//check if content has loaded,if yes then execute the function
document.addEventListener('DOMContentLoaded', getTodos);
todobutton.addEventListener('click',addTodo);
todolist.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);



//functions
function addTodo(event)
{
    //prevents form from submitting
    event.preventDefault();
    //todo div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newTodo=document.createElement("li");
    newTodo.innerText=todoinput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to localstorage
    saveLocalTodos(todoinput.value);
    //checkbutton
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add('complete-btn');
    todoDiv.appendChild(completedbutton);
    //deletebutton
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add('trash-btn');
    todoDiv.appendChild(trashbutton);
    //append to list
    todolist.appendChild(todoDiv);
    //clear input value
    todoinput.value="";
}

function deleteCheck(e)
{
  const item = e.target;
  //delete list
  if (item.classList[0]==="trash-btn")
  {
      const todo =item.parentElement;
      //animation
      todo.classList.add('fall');
      removeLocalTodos(todo);
      //then remove
      todo.addEventListener('transitionend',function()
      {
        todo.remove();
      });

      
  } 
  //check list
   if (item.classList[0]==="complete-btn")
   {
       const todo=item.parentElement;
       todo.classList.toggle("completed");
   }

}

function filterTodo(e)
{
  const todos =todolist.childNodes;
  todos.forEach(function(todo)
  {
    switch (e.target.value)
    {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains("completed"))
        {
          
          todo.style.display = 'flex';
        }
        else
        {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if(!todo.classList.contains("completed"))
        {
          todo.style.display="flex";
        }
        else
        {
          todo.style.display="none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo)
{
  let todos;
  if(localStorage.getItem('todos')=== null)
  {
    todos=[];
  }
  else
  {
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

}
function getTodos()
{
  let todos;
  if(localStorage.getItem('todos')=== null)
  {
    todos=[];
  }
  else
  {
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //todo div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newTodo=document.createElement("li");
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //checkbutton
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add('complete-btn');
    todoDiv.appendChild(completedbutton);
    //deletebutton
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add('trash-btn');
    todoDiv.appendChild(trashbutton);
    //append to list
    todolist.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo)
{
  let todos;
  if(localStorage.getItem('todos')=== null)
  {
    todos=[];
  }
  else
  {
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}