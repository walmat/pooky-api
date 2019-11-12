import PropTypes from 'prop-types';

// Cookies Definition
export default PropTypes.shape({
  pooky: PropTypes.string.isRequired,

  pooky_owl: PropTypes.string.isRequired,

  pooky_data: PropTypes.string.isRequired,

  pooky_electric: PropTypes.string.isRequired,

  pooky_order_allow: PropTypes.string.isRequired,

  pooky_performance: PropTypes.string.isRequired,

  pooky_recaptcha: PropTypes.string.isRequired,

  pooky_recaptcha_coherence: PropTypes.string.isRequired,

  pooky_settings: PropTypes.string.isRequired,

  pooky_telemetry: PropTypes.string.isRequired,

  pooky_use_cookie: PropTypes.bool.isRequired,

  updated_pooky_coherence: PropTypes.string.isRequired,
});
