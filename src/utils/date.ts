/**
 * WARNING
 * This file is an aggregation of stackoverflow snippets.
 * You shouldn't read this file if you don't know what you're doing. (Trust me it'll be better for you)
 */

function getWeek(date: Date) {
  let target = new Date(date.valueOf());
  let dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  let firstThursday = target.valueOf();
  target.setMonth(0, 1);

  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }

  return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
}

export function getDateRangeOfWeek(weekNo: number) {
  let d1 = new Date();
  let numOfdaysPastSinceLastMonday = d1.getDay() - 1;
  d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
  let weekNoToday = getWeek(d1);
  let weeksInTheFuture = weekNo - weekNoToday;
  d1.setDate(d1.getDate() + 7 * weeksInTheFuture);
  let range = [];

  for (let i = 0; i < 6; i++) {
    range.push(d1.getDate() + '/' + (d1.getMonth() + 1));
    d1.setDate(d1.getDate() + 1);
  }

  return range;
}

export function getWeekNumber(event: any) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((event.start.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  );
}

export function getCurrentWeekNumber() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((new Date().getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  );
}
