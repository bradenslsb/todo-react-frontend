import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"

import "./styles.css"

class App extends Component {
  constructor() {
    super()

    this.state = {
      todo: "",
      todos: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    axios
      .get("http://bgb-todo-api.herokuapp.com/todos")
      .then((res) => {
        this.setState({
          todos: res.data
        })
      })
      .catch((err) => console.error(err))
  }
  handleChange = e => {
    this.setState({
      todo: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    //Post to API
    axios
      .post("http://bgb-todo-api.herokuapp.com/todo", {
        title: this.state.todo,
        done: false
      })
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: ""
        })
      })
      .catch(err => console.error("handleSubmit Error: " ))
    //setState with new item
    
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <div key={todo.id} className="todo-item">
          <h1>{todo.title}</h1>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="app">
        <h1>Hello from app</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input
          type="text"
          placeholder="Add Todo"
          onChange={this.handleChange}
          value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>

        {this.renderTodos()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));