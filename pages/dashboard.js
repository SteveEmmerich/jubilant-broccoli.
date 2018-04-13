
import React, { Component } from 'react';
import Layout from '../components/Layout'
import withPage from '../hocs/withPage'
import Dashboard from '../components/Dashboard'
import History from '../components/History'
import fetch from 'isomorphic-unfetch';

class dashboard extends Component {
  static async getInitialProps({req}) {
    console.log('calling get data' + !!req)
    const res = await fetch('http://localhost:3000/v1/users')
   console.log(`res from server ${JSON.stringify(res)}`)
    const data = await res.json()

    console.log(`User data fetched. Count: ${data.length}`)  
      return {
        users: data
      }
  }
  render () {
    this.props = {...this.props, users: []}
    return (
      <Layout title="Dashboard">
       <History {...this.props}/>
      </Layout>
    )
  }
}


export default withPage(dashboard)