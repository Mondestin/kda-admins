const moment = require('moment');

// Format a date to a readable string
exports.formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

// Calculate the difference between two dates in days
exports.dateDifferenceInDays = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, 'days');
};

// Add days to a date
exports.addDaysToDate = (date, days) => {
  return moment(date).add(days, 'days').toDate();
};

// Check if a date is in the past
exports.isPastDate = (date) => {
  return moment(date).isBefore(moment(), 'day');
};
