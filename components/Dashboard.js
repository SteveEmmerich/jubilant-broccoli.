import withLoginRequired from '../hocs/auth-required'
import { compose } from 'recompose'

const Dashboard = (props) => (
  <ul>
    {props.users.map(({user}) => (
          <li key={user.id}>
            <p>{user}</p>
          </li>
        ))}
      </ul>
  )

export default compose(
  withLoginRequired('/dashboard')
)(Dashboard)