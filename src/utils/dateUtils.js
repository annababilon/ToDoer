export const changeDateFormatLong = function (localeDate) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(localeDate).toLocaleDateString("en-US", options);
};

export const changeDateFormatShort = function (localeDate) {
  var options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(localeDate).toLocaleDateString("en-GB", options);
};

export const isDeadlineSoon = function (deadline, numOfDays) {
  let comparisonDate = new Date();
  console.log(comparisonDate, deadline, numOfDays);
  comparisonDate.setDate(comparisonDate.getDate() + numOfDays);
  return comparisonDate >= new Date(deadline);
};
