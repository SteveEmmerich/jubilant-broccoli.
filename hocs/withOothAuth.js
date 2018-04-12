const OothClient = require('ooth-client')
const withOothNext = require('ooth-client-react-next')

const ooth = new OothClient({
  oothUrl: 'http://localhost:3000/auth',
  standalone: false
})

const withOothNextProvider = withOothNext(ooth)

export default withOothNextProvider