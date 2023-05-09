import ical from 'node-ical';
import 'setimmediate';
import { getFetes, getWeekNumber } from './date';
import { isExam, isInFuture } from './utils';

import config, { SaturdayType } from '../assets/config';

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

      const fetes = getFetes(new Date().getFullYear());
      const END_MIN = 45 * 60 * 1000;
      const END_HOURS = 19 * 60 * 60 * 1000;
      for (let [name, date] of Object.entries(fetes)) {
        database.push({
          type: 'VEVENT',
          start: new Date(date.getTime() + 8 * 60 * 60 * 1000),
          end: new Date(date.getTime() + END_HOURS + END_MIN),
          summary: name,
          location: 'France'
        });
      }
      const calendar = database.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
      resolve(calendar);
    });
  });
}

/**
 * @param {event} edt
 * @param {number} week
 * @returns {number[Event[]]}
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

  const weekEvent = Object.keys(temp).map((date: any) => temp[date]);

  if ((config.saturday as SaturdayType) === SaturdayType.disable) {
    weekEvent[5] = [];
  }

  return weekEvent;
}

export function getNextExam(edt: any) {
  const exam: any[] = [];

  Object.values(edt).forEach((el: any) => {
    if (isExam(el.summary) && isInFuture(el)) exam.push(el);
  });

  return exam;
}
