import React, {Component} from 'react'
import withRouter from './withRouter'
import {withUser} from 'ooth-client-react'
import {compose} from 'recompose'

export default url => {
    const withLoginRequired = C => (
        class extends Component {
            componentDidMount() {
                if (!this.props.user) {
                    this.props.Router.push(`/`)
                }
            }
            render() {
                if (this.props.user) {
                    return <C {...this.props}/>
                } else {
                    return <div>
                        <p>You need to log in to see this page.</p>
                    </div>
                }
            }
        }
    )

    return compose(
        withUser,
        withRouter,
        withLoginRequired
    )
}