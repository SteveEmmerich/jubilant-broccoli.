
import React, { Component } from 'react';
import Layout from '../components/Layout'
import withPage from '../hocs/withPage'
import Dashboard from '../components/Dashboard'
import History from '../components/History'
import fetch from 'isomorphic-unfetch';

class dashboard extends Component {
  render () {
    
    return (
      <Layout title="Dashboard">
       <History {...this.props}/>
      </Layout>
    )
  }
}


export default withPage(dashboard)