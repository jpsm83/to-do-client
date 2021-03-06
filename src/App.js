import { Route, Switch } from 'react-router';
import './App.css';
import AnonRoute from './components/AnonRoute/AnonRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import EditUser from './pages/EditUser/EditUser';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import TodoList from './pages/TodoList/TodoList';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/todo-list" exact component={TodoList} />
        <PrivateRoute path="/edit-user" exact component={EditUser} />
        <AnonRoute exact path="/signup" component={Signup} redirectPath="/todo-list" />
        <AnonRoute exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}