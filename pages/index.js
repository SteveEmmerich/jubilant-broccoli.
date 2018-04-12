import Layout from '../components/Layout';
import LoginComponent from '../components/Login'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


// HOCS
import withPage from '../hocs/withPage'


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
}


const Index = (props) => (
   <Layout {...props}>
     <LoginComponent />
    </Layout>
 )

Index.getInitialProps = async function ({req}) {
  let data = await getData()
  //let userAgent = getUserAgent(req)
  return {
   // userAgent: userAgent,
    shows: data
  }
}
const getData = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return data
}
const getUserAgent = (req) => {
  // needed for material ui css prefixes
  let userAgent;
  if(process.browser) {
    userAgent = navigator.userAgent;
  } else {
    userAgent = req.headers['user-agent']
  }
  return userAgent
}

export default withPage(Index)

/** <Layout>
      <h1> Batman TV Shows </h1>
      <ul>
        {shows.map(({show}) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout> */