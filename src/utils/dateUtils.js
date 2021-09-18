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

export const isDeadlineSoon = function (deadline) {
  let comparisonDate = new Date();
  return countDays(deadline, comparisonDate) <= 3;
};

export const countDays = function(date1, date2){
  return Math.round((new Date(date1) - new Date(date2))/ (1000 * 60 * 60 * 24));
  //   return Math.abs((new Date(date1) - new Date(date2))/ (1000 * 60 * 60 * 24));
}

export const checkIfTheSameDate = function(date1, date2){
  date1.setHours(0,0,0,0);
  date2.setHours(0,0,0,0);
  return countDays(date2,date1) === 0;
}