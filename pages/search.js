import Layout from '../components/Layout'
import withPage from '../hocs/withPage'
import {compose, withState, withHandlers} from 'recompose'
import Search, {SearchResultsComponent, SearchList} from '../components/Search'


const SearchPage = (props) => (
  <Layout title="Search">
    <Search {...props} onResults={props.setResults} />
    <SearchList {...props} />
  </Layout>
)
//<SearchResultsComponent {...props} results={props.results} />
export default compose(
  withState('results', 'setResults', []),
  withHandlers({
    onResults: ({ setResults }) => () => setResults(value => results = value)
  }),
  withPage
)(SearchPage)