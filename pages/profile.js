import Layout from '../components/Layout'
import withPage from '../hocs/withPage'
import Profile from '../components/Profile'


export default withPage((props) => (
  <Layout title="Profile">
    <Profile {...props} />
  </Layout>
))

