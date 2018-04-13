import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import {withUser, withOoth } from 'ooth-client-react'
import { compose } from 'recompose';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle';
import {GridList, GridTile} from 'material-ui/GridList';
import { Subheader, ToggleStar } from 'material-ui';
import IconButton from 'material-ui/IconButton/IconButton';

import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Star from 'material-ui/svg-icons/toggle/star';
import withLoginRequired from '../hocs/auth-required'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
}
class HistoryComponent extends Component {
  constructor(props) {
    super(props)
    this.favorite = this.favorite.bind(this)
  }
  favorite(_id, favorite) {
    const {mutate} = this.props
    console.log(_id, favorite)
    mutate({
      variables: {
        id: _id,
        favorite: !favorite
      }
    })
  }
  render() {
    const {data: {loading, history, refetch}} = this.props
    if(loading) {
      //TODO: replace with spinner
      return <p>Loading...</p>
    }
    
    return (
      <Paper style={styles.root} >
        <GridList
          cellHeight={80}
          style={styles.gridList}
        >
        <Subheader>History</Subheader>

        
          {history && history.map(search => (
            <GridTile 
              key={search._id}
              title={search.query}
          actionIcon={<IconButton onClick={() => {this.favorite(search._id, search.favorite)}}>{search.favorite ? <Star color="white" /> : <StarBorder color="white" />}</IconButton>} 
            >
            </GridTile>
          ))}
        </GridList>
        </Paper>
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
const FavoriteMutation = gql`
mutation($id: ID!, $favorite: Boolean) {
  updateSearch(_id: $id, favorite: $favorite) {
    _id
    favorite
  }
}`
const History = compose(
  graphql(HistoryQuery),
  graphql(FavoriteMutation, {options: (props) => ({
    refetchQueries: [{query: HistoryQuery}]
  })})
)(HistoryComponent)
export default compose(
  withLoginRequired('/dashboard'),
  withOoth,
  withUser
)(History)