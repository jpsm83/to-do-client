// axios connect the front with back
// service setup the config for the connection
import axios from 'axios';

export default class AuthService{
  constructor(){
    this.instance = axios.create({
      // REACT_APP_API_URL=http://localhost:5000/api comes from file .env
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      // withCredentials=true create cookies so cors (server) can reconize with user is in session
      withCredentials: true
    })
  }

  signup = (data) => this.instance.post('/signup', data);
  login = (data) => this.instance.post('/login', data);
  logout = () => this.instance.post('/logout');
  isLoggedIn = () => this.instance.get('/loggedin');
  edit = (data) => this.instance.put('/edit', data);
}