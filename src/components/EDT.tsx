import { useEffect, useState } from 'react';
import { getEDT, getWeekEvent } from '../utils/database';
import { formatHours } from '../utils/format';
import {
  Timetable,
  WeekPane,
  WeekRow,
  BlockName,
  BlockCours,
  Cours,
  HoursColumn,
  HoursDisplay
} from './Edt-part';

const hours = [
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
];

export function EDT({ code }: { code: string }) {
  const [edt, setEDT] = useState<any>([]);
  const [weekEvent, setWeekEvent] = useState<any>([]);

  const loadEDT = async () => {
    try {
      const edt = await getEDT(code.toLowerCase());
      setEDT(edt);
      const temp = getWeekEvent(edt, 38);
      setWeekEvent(temp);
      console.log(temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEDT();
  }, []);

  return (
    <Timetable>
      <div>
        <BlockName></BlockName>
        <HoursColumn>
          {hours.map(hour => (
            <HoursDisplay>{hour}</HoursDisplay>
          ))}
        </HoursColumn>
      </div>
      <WeekPane>
        <WeekRow>
          <BlockName>Lundi</BlockName>
          <BlockName>Mardi</BlockName>
          <BlockName>Mercredi</BlockName>
          <BlockName>Jeudi</BlockName>
          <BlockName>Vendredi</BlockName>
        </WeekRow>
        <WeekRow>
          {weekEvent.map((day: any, index: number) => {
            if (index > 4) return;
            return (
              <BlockCours key={index}>
                {day.map((cours: any, index: number) => {
                  return (
                    <Cours key={index}>
                      <p>{cours.summary}</p>
                      <p>{formatHours(cours)}</p>
                    </Cours>
                  );
                })}
              </BlockCours>
            );
          })}
        </WeekRow>
      </WeekPane>
    </Timetable>
  );
}
