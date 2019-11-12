import PropTypes from 'prop-types';

// Settings Definition
export default PropTypes.shape({
  // Default error delay for monitoring
  defaultErrorDelay: PropTypes.number.isRequired,

  // Default montior delay for monitoring
  defaultMonitorDelay: PropTypes.number.isRequired,
});
