import ical from 'node-ical';
import 'setimmediate';
import { getWeekNumber } from './date';
import { isExam, isInFuture } from './utils';

import config from '../assets/config';

export function getEDT(code: string) {
  return new Promise((resolve, reject) => {
    const database: any = [];

    ical.fromURL(config.ical.replaceAll('{{CODE}}', code), {}, function (err, data) {
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

/**
 * @param {event} edt
 * @param {number} week
 * @returns {number[evert[]]}
 */
export function getWeekEvent(edt: any, week: number) {
  // Some dark magic from stackoverflow
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

  const temp = edt
    .filter((event: any) => getWeekNumber(event) === week)
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

export function getNextExam(edt: any) {
  const exam: any[] = [];

  Object.values(edt).forEach((el: any) => {
    if (isExam(el.summary) && isInFuture(el)) exam.push(el);
  });

  return exam;
}
