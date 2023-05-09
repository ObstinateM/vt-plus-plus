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

export function getCurrentDayNumber() {
  const tmp = new Date().getDay();
  return tmp;
}

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const paques = function (year: number) {
  const a = year % 19;
  const century = Math.floor(year / 100);
  const yearsAfterCentury = year % 100;
  const d =
    (19 * a +
      century -
      Math.floor(century / 4) -
      Math.floor((Math.floor(century - (century + 8) / 25) + 1) / 3) +
      15) %
    30;
  const e =
    (32 + 2 * (century % 4) + 2 * Math.floor(yearsAfterCentury / 4) - d - (yearsAfterCentury % 4)) %
    7;
  const f = d + e - 7 * Math.floor((a + 11 * d + 22 * e) / 451) + 114;
  const month = Math.floor(f / 31);
  const day = (f % 31) + 1;

  return new Date(year, month - 1, day);
};

export function getFetes(year: number) {
  return {
    Armistice: new Date(year, 10, 11),
    Ascension: addDays(paques(year), 39),
    Assomption: new Date(year, 7, 15),
    'Fête Nationale': new Date(year, 6, 14),
    'Fête du travail': new Date(year, 4, 1),
    "Jour de l'an": new Date(year, 0, 1),
    'Lundi de Pentecôte': addDays(paques(year), 50),
    'Lundi de Pâques': addDays(paques(year), 1),
    Noël: new Date(year, 11, 25),
    Toussaint: new Date(year, 10, 1),
    'Victoire des alliés': new Date(year, 4, 8)
  };
}
