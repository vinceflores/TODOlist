
const form = document.querySelector("[data-form]");
const list = document.querySelector("[data-list]");
const input = document.querySelector("[data-input]");

class Storage {
  static addToStorage(p) {
    let storage = localStorage.setItem("todo", JSON.stringify(p));
    return storage;
  }

  static getStorage() {
    let storage = localStorage.getItem("todo") == null ? [] : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}
let todoArr = Storage.getStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  let todo;
  if(input.value != ""){ 
   todo = new TODO(id, input.value);
  todoArr = [...todoArr, todo];
  // console.log(todoArr); 
  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  // add to local storage
  Storage.addToStorage(todoArr);
  }
});

class TODO {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
        <div class="todo">
          <p>${item.todo}</p>
          <span class="remove" data-id = ${item.id}>🗑️</span>
        </div>
      `
    });
    list.innerHTML = (displayData).join(" ");
  }
  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    list.addEventListener("click", (e) => {
      // console.log(todoArr, "before");
      if (e.target.classList.contains("remove")) {
        // console.log("remove");
        // e.target.parentElemnet.remove(); 
        e.target.parentElement.remove(); ChannelSplitterNode
        let btnid = e.target.dataset.id;
        UI.removeArrayTodo(btnid);
        // console.log(todoArr, "After");
      }
    });
  }

  static removeArrayTodo(btnid) {
    // let value = todoArr.filter(i => i.id == btnid)[0].todo;
    // console.log(value, "removed");
    todoArr = todoArr.filter((item) => item.id != btnid);
    Storage.addToStorage(todoArr);
  }

}


window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo(); 
})
