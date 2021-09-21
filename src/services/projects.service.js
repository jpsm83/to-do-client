// axios connect the front with back
// service setup the config for the connection
import axios from 'axios';

export default class ProjectService{
  constructor(){
    this.instance = axios.create({
      // REACT_APP_API_URL=http://localhost:5000/api comes from file .env
      baseURL: `${process.env.REACT_APP_API_URL}/projects`,
      // withCredentials=true create cookies so cors (server) can reconize with user is in session
      withCredentials: true
    })
  }

  create = data => this.instance.post("/", data);
  get = () => this.instance.get("/");
  getOne = id => this.instance.get(`/${id}`);
  deleteOne = id => this.instance.delete(`/${id}`);
  updateOne = (id, data) => this.instance.put(`/${id}`, data);
}