import { useEffect, useState } from 'react';
import { getEDT, getWeekEvent, getEventCoordinates, getCurrentWeekNumber } from '../utils/database';
import {
  Timetable,
  PlaceItem,
  PlaceItemNoStyle,
  Hours,
  PlaceItemHours,
  PlaceItemCenter,
  ClassNameDisplay,
  ClassHour,
  Center
} from './Edt-part';
import { Pagination } from '@nextui-org/react';
import { formatHours, formatUE, shouldBeFormatted } from '../utils/format';
import { getEventColor } from '../utils/colors';
import { getDateRangeOfWeek } from '../utils/date';
import { useTheme } from '@nextui-org/react';

const hours = [
  '8:00',
  '8:15',
  '8:30',
  '8:45',
  '9:00',
  '9:15',
  '9:30',
  '9:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00'
];

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export function EDT({ code }: { code: string }) {
  const [edt, setEDT] = useState<any>([]);
  const [weekEvent, setWeekEvent] = useState<any>([]);
  const [weekNumber, setWeekNumber] = useState<number>(getCurrentWeekNumber());
  const [weekDate, setWeekDate] = useState<string[]>([]);
  const { type } = useTheme();

  const loadEDT = async () => {
    try {
      const edt = await getEDT(code.toLowerCase());
      setEDT(edt);
      setWeekEvent(getWeekEvent(edt, weekNumber));
    } catch (err) {
      console.log(err);
    }
  };

  const changeWeek = (number: number): void => {
    setWeekNumber(actual =>
      actual + number < 1 || actual + number > 52 ? actual : actual + number
    );
  };

  useEffect(() => {
    loadEDT();
    document.addEventListener('keyup', event => {
      event.preventDefault();

      if (event.key === 'ArrowRight') {
        changeWeek(1);
      }

      if (event.key === 'ArrowLeft') {
        changeWeek(-1);
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        setWeekNumber(getCurrentWeekNumber());
      }
    });
  }, []);

  useEffect(() => {
    setWeekEvent(getWeekEvent(edt, weekNumber));
    setWeekDate(getDateRangeOfWeek(weekNumber));
  }, [weekNumber]);

  return (
    <>
      <Timetable type={type}>
        <PlaceItemNoStyle gridColumn="1" gridRow="1"></PlaceItemNoStyle>

        {days.map((day, index) => (
          <PlaceItemCenter gridColumn={index + 2} gridRow="1" key={index}>
            {day}
            <b>{weekDate[index]}</b>
          </PlaceItemCenter>
        ))}

        {hours.map((hour, index) => (
          <PlaceItemHours gridColumn="1" gridRow={index + 2} key={index} type={type}>
            <Hours>{hour}</Hours>
          </PlaceItemHours>
        ))}

        {weekEvent.map((day: any, index: number) => {
          return day.map((event: any) => {
            const { startCoord, endCoord } = getEventCoordinates(event);
            const { bgColor, borderColor } = getEventColor(type, event.summary);
            return (
              <PlaceItem
                bgColor={bgColor}
                borderColor={borderColor}
                gridColumn={index + 2}
                gridRow={`${startCoord} / ${endCoord}`}
                key={event.id}
              >
                <ClassNameDisplay>
                  {shouldBeFormatted(code) ? formatUE(event.summary, code) : event.summary}
                </ClassNameDisplay>
                <ClassHour>
                  {formatHours(event)} ― {event.location}
                </ClassHour>
              </PlaceItem>
            );
          });
        })}
      </Timetable>
      <Center>
        <Pagination
          color="secondary"
          total={52}
          page={weekNumber}
          onChange={(number: number) => setWeekNumber(number)}
          css={{ mt: '10px' }}
        />
      </Center>
    </>
  );
}
