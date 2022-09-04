import ical from 'node-ical';
import 'setimmediate';

interface codeInterface {
  [key: string]: string;
}

const codeToIcal: codeInterface = {
  l3miaa: 'l3miaa',
  l2infog1: 'l2infog1_etudiant(e)',
  l2infog2: 'l2infog2_etudiant(e)',
  l2infog3: 'l2infog3_etudiant(e)',
  l2infog4: 'l2infog4_etudiant(e)'
};

// Query l'url, parser le ical puis trier par date
export function getEDT(code: string) {
  return new Promise((resolve, reject) => {
    const database: any = [];

    ical.fromURL(
      `https://edt.univ-evry.fr/icsetudiant/${codeToIcal[code]}.ics`,
      {},
      function (err, data) {
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
      }
    );
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
    .reduce((acc: any, event: any) => {
      const day = event.start.getDay();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(event);
      return acc;
    }, {});

  return Object.keys(temp).map((date: any) => temp[date]);
}

// TODO: Later in the dev
export function getMonthEvent(edt: any, week: number) {}

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
