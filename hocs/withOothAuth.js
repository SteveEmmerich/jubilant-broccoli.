/*const OothClient = require('ooth-client')
const withOothNext = require('ooth-client-react-next')
const ooth = new OothClient({
  oothUrl: 'http://localhost:3000/auth',
  standalone: false
})*/
import OothClient from 'ooth-client';
import withOothNext from 'ooth-client-react-next';
import settings from '../public-settings';
const ooth = new OothClient({
  oothUrl: `${settings.url}/auth`
})

const withOothNextProvider = withOothNext(ooth)

export default withOothNextProvider