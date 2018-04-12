import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { withOoth } from 'ooth-client-react'
import {compose } from 'recompose';
import withRedirectUser from '../hocs/redirect-user';

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      username: '',
      password: ''
    }
    this.unameChanged = this.unameChanged.bind(this)
    this.passwordChanged = this.passwordChanged.bind(this)
    this.login = this.login.bind(this)
    this.reg = this.reg.bind(this)
  }
  unameChanged(ev, value) {
    this.setState({username: value})
  }
  passwordChanged(ev, value) {
    this.setState({password: value})
  }
  login() {
    const {username, password} = this.state
      this.props.oothClient.authenticate('local', 'login', {
        username,
        password
      }).catch(e => {
        this.setState({
          error: e.message
        })
      })
  }
  reg() {
  /*let unameEL = this.refs.username;
    let passEL = this.refs.password;
    if(unameEL && passEL) {*/
      const {username, password} = this.state
      console.log(JSON.stringify(username))
      this.props.oothClient.method('local', 'register', {
        email: username,
        password
      }).then(() => {
        const res = this.props.oothClient.authenticate('local', 'login', {
          username,
          password
        })
      }).catch(e => {
        console.log(`username: ${username}, password: ${password}`)
        console.log(e)
        this.setState({
          error: e.message
        })
      })
    //}
  }
  render() {
    return (
      <div>
        <TextField 
          hintText="Username"
          floatingLabelText="Username"
          onChange={this.unameChanged}
          ref={username => {
            this.username = username;
          }}
        />
        <TextField 
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={this.passwordChanged}
          ref={password => {
            this.password = password
          }}
        />
        <FlatButton label="Login" fullWidth={true} onClick={this.login} />
        <FlatButton label="Register" fullWidth={true} onClick={this.reg} />
      
      </div>
    )
  }
}

export default compose(
  withOoth,
  withRedirectUser
)(LoginComponent)
