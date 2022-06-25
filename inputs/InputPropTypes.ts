import PropTypes from 'prop-types';

/**
 * Common PropTypes for all @specfocus/view-focus.mui-demo inputs
 */
export const InputPropTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  resource: PropTypes.string,
  source: PropTypes.string,
};
