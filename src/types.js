import PropTypes from "prop-types";

export const location = PropTypes.shape({
	pathname: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	hash: PropTypes.string.isRequired,
	key: PropTypes.string
});
