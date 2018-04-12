import Header from './Header';
//UI Imports
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

//Make sure react-tap-event-plugin only gets injected once
// needed for material UI
if(!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const layoutStyle = {
  margin: 20, 
  padding: 20,
  border: '1px solid #DDD'
}
const muiTheme = {
  palette: {
    accent1Color: deepOrange500
  }
}
const Layout = (props) => {
  const {userAgent} = props;
  return (
  <MuiThemeProvider muiTheme={getMuiTheme({userAgent, ...muiTheme})}>
    <div>
      <Header {...props}/>
      {props.children}
    </div>
  </MuiThemeProvider>
)}

export default Layout