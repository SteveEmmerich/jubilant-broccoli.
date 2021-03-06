// Store the router in context
import PropTypes from 'prop-types';
import {getContext} from 'recompose';

export default getContext({
  Router: PropTypes.object
})