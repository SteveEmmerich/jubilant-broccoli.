import React, { Component } from 'react'
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';
import {compose } from 'recompose';
import {withUser, withOoth} from 'ooth-client-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


/*const RESULTS_PER_PAGE = 10
const SearchQuery = gql`
query users($first: Int!, $skip: Int!, $query: String!) {
  users(first: $first, skip: $skip, query: $query) {
      _id
      github
      profileImg
      username
      createdAt
  }
  _usersMeta {
    count
  }
}
`
const SearchResultsList = ({
  data: {loading, error, users, _usersMeta},
  loadMoreUsers
}) => {
  if(error) return <p> Error: {`${error}`}</p>
  if(users && users.length) {
    const areMoreUsers = users.length < _usersMeta.count
    return (
      <section>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              </li>
          ))}
        </ul>
        {areMoreUsers ? (
          <button onClick={() => loadMoreUsers()}>
            {' '}
            {loading ? 'loading...' : 'Show More'}{' '}
          </button>
        ): ('')}
      </section>
    
    )
  }
  return <div> Loading...</div>
}
const allUsersQueryVars = {
  skip: 0,
  first: RESULTS_PER_PAGE

}
export const SearchList = graphql(SearchQuery,{
  options: {
    variables: allUsersQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMoreUsers: () => {
      return data.fetchMore({
        variables: {
          skip: data.users.length
        },
        updateQuery: (previousResult, {fetchMoreResult }) => {
          if(!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            users: [...previousResult.users, ...fetchMoreResult.users]
          })
        }
      })
    }
  })
})(SearchResultsList)*/

const UsersQuery = gql`
query Users($query: String) {
  users(query: $query) {
      _id
      username
      email
    
  }
}`
  class SearchResultsList extends Component {
    render() {
      const {data: {loading, users, refetch}} = this.props
      if(loading) {
        //TODO: replace with spinner
        return <p>Loading...</p>
      }
      console.log(users)
      return (
        <div>
          <h2> Results </h2>
          <ul>
            {users && users.map(user => (
              <li key={user._id}>
                <h3>{user.email}</h3>
                <p>{user.username}</p>
              </li>  
            ))}
          </ul>
          </div>
      )
    }
  }
  const SearchResults = graphql(UsersQuery, {options: { variables: {query: 'test'}}})(SearchResultsList)
export const SearchList = compose(
    withOoth,
    withUser
  )(SearchResults)

const CreateSearchQuery = gql`
  mutation($query: String!) {
    createSearch(query: $query) {
      _id
    }
  }
`

class SearchComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      results: []
    }
    this.searchChanged = this.searchChanged.bind(this)
    this.search = this.search.bind(this)
  }
  searchChanged(ev, value) {
    this.setState({searchText: value})
  }
  search() {
    const {onResults, mutate} = this.props
    mutate({
      variables: {
        query: this.state.searchText
      }
    }).then(({data}) => {
      if(onResults) {
        onResults(data)
      }
    })
  }
  render() {
    const {user, mutate} = this.props;
    if(!user) {
      return <p><a href="/">Login to search</a></p>
    }
    return (
      <Paper>
        <TextField
          hintText="Search"
          floatingLabelText="Search"
          onChange={this.searchChanged}
          ref="search" />
        <FlatButton label="Search" fullWidth={true} onClick={this.search} />
      </Paper>
    )
  }
}
const Search = compose(
  withUser,
  graphql(CreateSearchQuery, {
    options: (props) => ({
    refetchQueries: [
      {query: UsersQuery, 
      variables: {query: props.query}}]
  })})
)(SearchComponent)

export class SearchResultsComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {results} = this.props;
    return (
      <Paper>
        {results && results.map((result => {
          <Card>
            <CardHeader
              title={result.username}
              subtitle={result.github}
              avatar={result.profileImg}
            />
           </Card>
        })) }
        </Paper>
    )
  }
}

export default Search
