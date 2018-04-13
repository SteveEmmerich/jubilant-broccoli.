import PropTypes from 'prop-types';
import {compose, withContext} from 'recompose';
import withOothNextProvider from './withOothAuth';
import withUserAgent from './withUserAgent';
import withNext from './withNext';
import withApollo from './withApollo';
import withSettings from './withSettings';
export default compose(
  withApollo,
  withOothNextProvider,
  withNext,
  withSettings,
  withUserAgent
)