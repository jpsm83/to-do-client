import React, { Component } from 'react'
import RoundButton from '../../components/RoundButton/RoundButton';
import { withAuth } from '../../context/auth.context';
import { Link } from 'react-router-dom';

// use / in the begging and end of an irregular expression - / irregular expression/
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ 

// validators must be equal to backend
const validators = {
  username: (value) => {
    let message;
    if(!value){
      message = 'Username is required';
    }
    return message;
  },

  email: (value) => {
    let message;
    if(!value){
      message = 'Email is required';
    } else if(!EMAIL_PATTERN.test(value)){
      message = 'Invalid email';
    }
    return message;
  },

  password: (value) => {
    let message;
    if(!value){
      message = 'Password is required';
    } else if(value.length < 3){
      message = 'Invalid password'
    }
    return message;
  }
}

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {
        username: "",
        email: "",
        password: ""
      },
      errors: {
        username: null,
        email: null,
        password: null
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    // uses signup that comes as props from context auth.context.js
    this.props.signup(this.state.fields);
  }

  handleChange(event){
    const { name, value } = event.target;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name](value)
      }
    })
  }

  render() {
    const { fields } = this.state;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-item">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={fields.username} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={fields.email} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className="form-item">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={fields.password} onChange={(e) => this.handleChange(e)} />
        </div>

        <RoundButton type="submit">
          Create user
        </RoundButton>

        <RoundButton>
          <Link to='/login'>Login</Link>
        </RoundButton>
      </form>
    )
  }
}

// connect with the context auth.context.js using withAuth()
export default withAuth(Signup);