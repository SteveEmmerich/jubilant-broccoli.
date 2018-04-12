import Layout from '../components/Layout';
import WithPage from '../hocs/withPage';

export default WithPage((props) => (
  <Layout title="About">
    <p> This is the about page {props.user}</p>
  </Layout>
))
