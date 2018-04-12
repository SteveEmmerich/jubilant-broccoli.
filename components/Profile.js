import React, {Component } from 'react';
import {withUser, withOoth } from 'ooth-client-react'
import { compose } from 'recompose';
import withLoginRequired from '../hocs/auth-required'

class Profile extends Component {
  render() {
    return (
      <div>
        <Username />
        <Email />
      </div>
    )
  }
}
export default compose(
  withLoginRequired('/profile'),
  withUser
)(Profile)

class UsernameComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {user} = this.props
    const username = user.local && user.local.username
    return (
      <p>{username}</p>
    )
  }
}
const Username = compose(
  withOoth,
  withUser
)(UsernameComponent)

class EmailComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {user} = this.props
    const email = user.local && user.local.email
    return (
      <p>{email}</p>
    )
  }
}
const Email = compose(
  withOoth,
  withUser
)(EmailComponent)
