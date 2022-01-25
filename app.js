// DRY Version, Don't Repeat Yourself

const todos = [];

const get = (elements) =>
  elements.map((element) => document.getElementById(element));

const [pendingList, completedList, addForm, newTodo] = get([
  "pendingList",
  "completedList",
  "addForm",
  "newTodo",
]);

const newList = [
  {
    element: pendingList,
    status: "pending",
  },
  {
    element: completedList,
    status: "done",
  },
];

const cssClasses = {
  pending:
    "bg-gray-300 w-1/2 text-center text-red-600 text-lg rounded py-1 border-2 border-red-600 transition transform ease-in-out duration-400 hover:bg-red-800 hover:text-white hover:scale-105 cursor-pointer",
  done:
    "bg-gray-300 w-1/2 text-center text-green-600 text-lg rounded py-1 border-2 border-green-700 transition transform ease-in-out duration-400 hover:bg-green-700 hover:text-white hover:scale-105 cursor-pointer",
};

const updateTodos = () => {
  newList.forEach((list) => {
    const filteredTodos = todos.filter((todo) => todo.status === list.status);

    list.element.innerHTML = "";
    filteredTodos.forEach((todo) => {
      const item = document.createElement("li");
      item.className = cssClasses[list.status];
      item.innerText = todo.text;
      item.id = todo.id;
      list.element.appendChild(item);
    });
  });
};

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  todos.push({
    id: Math.floor(Math.random() * 100000).toString(),
    text: newTodo.value,
    status: "pending",
  });
  newTodo.value = "";
  updateTodos();
});

pendingList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "done";
  updateTodos();
});

completedList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "pending";
  updateTodos();
});
