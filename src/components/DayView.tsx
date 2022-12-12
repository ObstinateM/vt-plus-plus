import { getWeekEvent, getEDT } from '../utils/database';
import {
  Center,
  ClassHour,
  ClassNameDisplay,
  DayTimetable,
  Hours,
  PlaceItem,
  PlaceItemCenter,
  PlaceItemHours
} from './Edt-part';
import { Pagination, useTheme } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getCurrentDayNumber, getCurrentWeekNumber, getDateRangeOfWeek } from '../utils/date';
import { useSearchParams } from 'react-router-dom';
import { getEventCoordinates } from '../utils/utils';
import { getEventColor } from '../utils/colors';
import { formatClassname, formatHours, formatUE, shouldBeFormatted } from '../utils/format';
import { hours } from './EDT';

const day = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sat'];

function DayView() {
  const [weekEvent, setWeekEvent] = useState<any[]>([[], [], [], [], [], []]);
  const [weekDate, setWeekDate] = useState<string[]>([]);
  const [dayNumber, setDayNumber] = useState<number>(getCurrentDayNumber());
  const [code, setCode] = useState<string>('');
  const [showHours, setShowHours] = useState<boolean>(false);
  const weekNumber = getCurrentWeekNumber();
  let edt: any = null;

  const { type } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setShowHours(searchParams.get('hours') ? true : false);
    setCode(searchParams.get('code') ?? '');
    setWeekDate(getDateRangeOfWeek(weekNumber));
  }, []);

  useEffect(() => {
    loadData();
  }, [code]);

  async function loadData() {
    edt = await getEDT(code);
    setWeekEvent(getWeekEvent(edt, weekNumber));
  }

  if (code === '') {
    return <p>Please provide a code</p>;
  }

  return (
    <>
      <DayTimetable type={type} showHours={showHours}>
        <PlaceItemCenter gridColumn={2} gridRow="1">
          {day[dayNumber - 1]}
          <b>{weekDate[dayNumber - 1]}</b>
        </PlaceItemCenter>

        {showHours &&
          hours.map((hour, index) => (
            <PlaceItemHours gridColumn="1" gridRow={index + 2} key={index} type={type}>
              <Hours>{hour}</Hours>
            </PlaceItemHours>
          ))}

        {weekEvent[dayNumber - 1].map((event: any) => {
          const { startCoord, endCoord } = getEventCoordinates(event);
          const { bgColor, borderColor } = getEventColor(type, event.summary);
          return (
            <PlaceItem
              bgColor={bgColor}
              borderColor={borderColor}
              gridColumn={2}
              gridRow={`${startCoord} / ${endCoord}`}
              key={event.id}
            >
              <ClassNameDisplay>
                {formatClassname(
                  shouldBeFormatted(code) ? formatUE(event.summary, code) : event.summary
                )}
              </ClassNameDisplay>
              <ClassHour>
                {formatHours(event)} ― {event.location}
              </ClassHour>
            </PlaceItem>
          );
        })}
      </DayTimetable>
      <Center>
        <Pagination
          color="secondary"
          total={6}
          page={dayNumber}
          onChange={(n: number) => setDayNumber(n)}
          css={{ mt: '10px' }}
        />
      </Center>
    </>
  );
}

export default DayView;
