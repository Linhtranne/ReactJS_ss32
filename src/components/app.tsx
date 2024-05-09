
import './styles.css'
import React, { useState } from 'react';

interface ITodoList {
  id: number;
  name: string;
  completed: boolean;
}

class TodoList implements ITodoList {
  id: number;
  name: string;
  completed: boolean;

  constructor(name: string) {
    this.id = Date.now();
    this.name = name;
    this.completed = false;
  }

  renderJob(element: HTMLElement) {
    const jobItem = document.createElement("li");
    jobItem.id = `job-${this.id}`;

    const [completed, setCompleted] = useState(this.completed);

    const handleCheckboxChange = () => {
      setCompleted(!completed);
      TodoList.saveToLocalStorage(todoList); 
    };

    const handleEditClick = () => {

    };

    const handleDeleteClick = () => {
      const index = todoList.findIndex((job) => job.id === this.id);
      if (index !== -1) {
        todoList.splice(index, 1);
        jobItem.remove();
        TodoList.saveToLocalStorage(todoList);
      }
    };

    return (
      <li id={`job-${this.id}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <span>{this.name}</span>
        <button onClick={handleEditClick}>Sửa</button>
        <button onClick={handleDeleteClick}>Xoá</button>
      </li>
    );
  }

  static createJob(name: string): TodoList {
    return new TodoList(name);
  }

  updateJob(completed: boolean) {
    this.completed = completed;
  }

  deleteJob() {}

  static saveToLocalStorage(todoList: TodoList[]) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  static loadFromLocalStorage(): TodoList[] {
    const storedList = localStorage.getItem("todoList");
    return storedList ? JSON.parse(storedList) : [];
  }
}

const todoInput = document.getElementById("new-todo-input") as HTMLInputElement;
const addTodoButton = document.getElementById("add-todo-button")!;
const todoListElement = document.getElementById("todo-list")!;
const todoList: TodoList[] = TodoList.loadFromLocalStorage();
todoList.forEach((job) => {
  const todoItem = new TodoList(job.name);
  todoItem.renderJob(todoListElement);
});
addTodoButton.addEventListener("click", () => {
  const newTodoText = todoInput.value.trim();
  if (newTodoText) {
    const newJob = TodoList.createJob(newTodoText);
    todoList.push(newJob);
    newJob.renderJob(todoListElement);
    TodoList.saveToLocalStorage(todoList);
    todoInput.value = "";
  }
});

export default function app() {
  return (
    <div>
  <div className="container">
    <h1>Danh Sách Công việc </h1>
    <div className="input-area">
      <input type="text" id="new-todo-input" placeholder="New Todo"/>
      <button id="add-todo-button">Thêm</button>
    </div>
    <h2>TodoList</h2>
    <ul id="todo-list">
      </ul>
    <div className="button-area">
      <button id="delete-done-button">xóa</button>
      <button id="delete-all-button">sửa</button>
    </div>
  </div> 
    </div>
  )
}
