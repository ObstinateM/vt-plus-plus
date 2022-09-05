// @ts-nocheck
Date.prototype.getWeek = function () {
  var target = new Date(this.valueOf());
  var dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

export function getDateRangeOfWeek(weekNo) {
  var d1 = new Date();
  var numOfdaysPastSinceLastMonday = d1.getDay() - 1;
  d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
  var weekNoToday = d1.getWeek();
  var weeksInTheFuture = weekNo - weekNoToday;
  d1.setDate(d1.getDate() + 7 * weeksInTheFuture);
  let range = [];
  for (let i = 0; i < 6; i++) {
    range.push(d1.getDate() + '/' + (d1.getMonth() + 1));
    d1.setDate(d1.getDate() + 1);
  }
  return range;
}
