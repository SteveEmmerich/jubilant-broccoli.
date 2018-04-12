import Link from 'next/link';
import AppBar from 'material-ui/AppBar';
import {withUser, withOoth} from 'ooth-client-react';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu'

const linkStyle = {
  marginRight: 15
}
const LoggedIn = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {props.user && props.user.local && props.user.local.role == 'admin' ? <MenuItem primaryText="Add New User" /> : undefined}
      <MenuItem primaryText="Sign Out" onClick={() => {
        props.oothClient.logout();
      }}/>
  </IconMenu>
)
const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><NavigationMenuIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <Link href='/'>
      <MenuItem primaryText="Home" />
    </Link>
    <Link href='/about'>
      <MenuItem primaryText="About" />
    </Link>
    <Link href='/dashboard'>
      <MenuItem primaryText="Dashboard" />
    </Link>
    <Link href='/profile'>
      <MenuItem primaryText="Profile" />
    </Link>
    <Link href='/search'>
      <MenuItem primaryText="Search" />
    </Link>
  </IconMenu>
)
const Header = (props) => (
  <AppBar
    title={props.title}
    iconElementLeft={props.user ? <Menu {...props}/> : undefined}
    iconElementRight={props.user ?  <LoggedIn {...props}/> : undefined} >
  </AppBar>
)

export default withOoth(withUser(Header))