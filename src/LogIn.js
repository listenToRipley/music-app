import React, {Component} from 'react';
import NavBar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import { Button, TextField , Card, CardContent } from '@material-ui/core';
import './App.css';

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: '',
      password: ''
   };
  };

  clickHandler = (e) => {

    if (this.state.username === '') {
      alert(`You haven't entered a username yet`) 
    } else if (this.state.password === '') {
      alert(`You must have a password`)
    } else if (this.state.username !== '' && this.state.password !== '') {
    this.setState({
      loggedIn: !this.state.loggedIn,
    })
  }
    console.log(this.state)
  };

  handleName = e => {
      this.setState({
        username: e.target.value,
      })
  }

  handlePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  render() { 
  
    return this.state.loggedIn ? <Dashboard user={this.state.username}/> : (
      <div>
        <NavBar />
          <Card className="logInCard">
            <CardContent>
               <TextField onChange={this.handleName} label="Username *" />
               <br />
               <TextField onChange={this.handlePassword} type="password" id="outlined-password-input" label="Password *" />
               <br />
               <Button className="logInButton" onClick={this.clickHandler}>Log In</Button>
            </CardContent>
          </Card>
      </div>
    )
  }
}

export default LogIn;