import ical from 'node-ical';
import 'setimmediate';

// Query l'url, parser le ical puis trier par date
export function getEDT(code: string) {
  return new Promise((resolve, reject) => {
    const database: any = [];

    ical.fromURL(`https://edt-api.obstinate.fr/${code}`, {}, function (err, data) {
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

// TODO: Fix the bug, when a day isnt filled it wrongly place others
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
