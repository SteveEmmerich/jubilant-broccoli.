import PropTypes from 'prop-types';
import {compose, withContext} from 'recompose';
import withOothNextProvider from './withOothAuth';
import withUserAgent from './withUserAgent';
import withNext from './withNext';

export default compose(
  withOothNextProvider,
 // withNext,
  withUserAgent
)