const withUserAgent = Page => {
  const WithUserAgent = props => <Page {...props} />

  WithUserAgent.getInitialProps = async context => {
    const userAgent = context.req 
      ? context.req.headers['user-agent'] 
      : navigator.userAgent;

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      userAgent
    }
  }
  return WithUserAgent
}
export default withUserAgent