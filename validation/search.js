const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateSearchInput = data => {
  // Errors object to keep track of errors
  const errors = {};

  // If the search query is not empty return it otherwise assign it to an empty string
  const searchQuery = !isEmpty(data) ? data : '';

  // If the length of the query string exceeds more than 25 characters
  // append to the erros object
  if (!Validator.isLength(searchQuery, { max: 25 })) {
    errors.searchQuery = 'Search query must not exceed more than 25 characters';
  }
  // If the query string is empty, append to the errors object
  if (Validator.isEmpty(searchQuery)) {
    errors.searchQuery = 'Search field is required';
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
};

module.exports = validateSearchInput;
