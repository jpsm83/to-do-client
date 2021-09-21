import React, { Component } from 'react'
import CreateTodo from '../../components/CreateTodo/CreateTodo';
import Text from '../../components/Text';
import Todo from '../../components/Todo/Todo';
import { withAuth } from '../../context/auth.context';
import TodoService from '../../services/todos.service'
import SCTodoList from './TodoList.styled';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    this.todoService = new TodoService();
    // if you use functions/methods from parent without arrow function
    // you must use .bind for it to work - NOT RECOMENDED...
    // this.refreshState = this.refreshState.bind(this);
  }

  componentDidMount() {
    this.refreshState();
  }

  //very important method, it refresh the render when any
  //changes are made as update, create, delete
  refreshState() {
    this.todoService.get()
      .then(response => {
        // axios gives the response in '.data'
        console.log(response.data);
        this.setState({ todos: response.data });
      })
      .catch(err => console.error(err))
  }

  displayTodos(){
    const { todos } = this.state;
    return todos.map(todo => {
      // <Todo key={todo.id} todo={todo}/>
      // <Todo key={todo.id} name={todo.name} description={todo.description} done={todo.done} .../>
      return (
        <Todo refreshState={() => this.refreshState()} key={todo.id} {...todo}/>
      )
    })
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { todos } = this.state;
    return (
      <SCTodoList>
        <Text className="close-session" onClick={() => this.handleLogout()} as="p" color="black">Cerrar sesión</Text>
        <div className="card">
          <Text size="l" weight="superDisplay" color="black">
            {todos.length === 0 ? "Ups, no tienes ningún todo" : todos.length === 1 ? "Estás más cerca de no dejarte nada, todo" : "Perfecto, sigue añadiento todos"}
          </Text>
          {
            this.displayTodos()
          }
          <CreateTodo refreshState={() => this.refreshState()} />
        </div>
      </SCTodoList>
    )
  }
}

export default withAuth(TodoList);