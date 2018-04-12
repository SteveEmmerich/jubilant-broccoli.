import React, {Component} from 'react';
import {withUser} from 'ooth-client-react';
import withRouter from './withRouter';
import {compose} from 'recompose';

export default (C) => {
  class Redirect extends Component {
    componentDidMount() {
      if(this.props.user) {
        this.props.Router.push(this.props.next || '/dashboard')
      }
    }
    componentDidUpdate() {
      if(this.props.user) {
        this.props.Router.push(this.props.next || '/dashboard')
      }
    }
    render() {
      if(this.props.user) {
        return (
          <div>
            <p> You are Logged in. Click <a href={this.props.next || '/dashboard'}>here</a> if don't get redirected.</p>
          </div>
        )
      } else {
        return <C {...this.props} />
      }
    }
  }
  return compose(
    withUser,
    withRouter
  )(Redirect)
}
