import ical from 'node-ical';
import 'setimmediate';

import config from '../assets/config';

function isExam(className: string) {
  let str = className.split(' ');
  let type = str[str.length - 1];
  return type === 'Examen' || type === 'DS';
}

function isInFuture(event: any) {
  if (event.start <= new Date() || event.start.getFullYear() !== new Date().getFullYear())
    return false;
  return true;
}

export function getEDT(code: string) {
  return new Promise((resolve, reject) => {
    const database: any = [];

    ical.fromURL(config.ical.replaceAll("{{CODE}}", code), {}, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }

      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          const ev = data[k];
          if (data[k].type == 'VEVENT') {
            database.push(ev);
          }
        }
      }

      const calendar = database.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
      resolve(calendar);
    });
  });
}

export function getWeekEvent(edt: any, week: number) {
  // Some dark magic from stackoverflow
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);

  const temp = edt
    .filter(
      (event: any) =>
        1 +
          Math.round(
            ((event.start.getTime() - week1.getTime()) / 86400000 -
              3 +
              ((week1.getDay() + 6) % 7)) /
              7
          ) ===
        week
    )
    .reduce(
      (acc: any, event: any) => {
        const day = event.start.getDay();
        acc[day].push(event);
        return acc;
      },
      { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
    );

  return Object.keys(temp).map((date: any) => temp[date]);
}

export function getEventCoordinates({ start, end }: { start: Date; end: Date }) {
  return {
    startCoord: 2 + ((start.getHours() - 8) * 60) / 15 + start.getMinutes() / 15,
    endCoord: 2 + ((end.getHours() - 8) * 60) / 15 + end.getMinutes() / 15
  };
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

export function getNextExam(edt: any) {
  const exam: any[] = [];

  Object.values(edt).forEach((el: any) => {
    if (isExam(el.summary) && isInFuture(el)) exam.push(el);
  });

  return exam;
}
