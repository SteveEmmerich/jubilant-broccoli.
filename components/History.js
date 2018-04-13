import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import {withUser, withOoth } from 'ooth-client-react'
import { compose } from 'recompose';

class HistoryComponent extends Component {
  render() {
    const {data: {loading, history, refetch}} = this.props
    if(loading) {
      //TODO: replace with spinner
      return <p>Loading...</p>
    }
    console.log(history)
    return (
      <div>
        <h2> History </h2>
        <ul>
          {history && history.map(search => (
            <li key={search._id}>
              <h3>{search.query}</h3>
              <p>{search.favorite}</p>
            </li>  
          ))}
        </ul>
        </div>
    )
  }
}
const HistoryQuery = gql`
  query  {
    history {
      _id
      userId
      query
      favorite
    }
  }
`
const History = graphql(HistoryQuery)(HistoryComponent)
export default compose(
  withOoth,
  withUser
)(History)