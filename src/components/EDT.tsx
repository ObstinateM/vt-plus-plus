import { useEffect, useState } from 'react';
import { getEDT, getWeekEvent, getEventCoordinates, getCurrentWeekNumber } from '../utils/database';
import { Timetable, PlaceItem, PlaceItemNoStyle, Hours, PlaceItemHours } from './Edt-part';
import { Pagination } from '@nextui-org/react';

// const hours = [
//   '8:00',
//   '',
//   '',
//   '',
//   '9:00',
//   '',
//   '',
//   '',
//   '10:00',
//   '',
//   '',
//   '',
//   '11:00',
//   '',
//   '',
//   '',
//   '12:00',
//   '',
//   '',
//   '',
//   '13:00',
//   '',
//   '',
//   '',
//   '14:00',
//   '',
//   '',
//   '',
//   '15:00',
//   '',
//   '',
//   '',
//   '16:00',
//   '',
//   '',
//   '',
//   '17:00',
//   '',
//   '',
//   '',
//   '18:00',
//   '',
//   '',
//   '',
//   '19:00',
//   '',
//   '',
//   '',
//   '20:00'
// ];

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

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export function EDT({ code }: { code: string }) {
  const [edt, setEDT] = useState<any>([]);
  const [weekEvent, setWeekEvent] = useState<any>([]);
  const [weekNumber, setWeekNumber] = useState<number>(getCurrentWeekNumber());

  const loadEDT = async () => {
    try {
      const edt = await getEDT(code.toLowerCase());
      setEDT(edt);
      setWeekEvent(getWeekEvent(edt, weekNumber));
      // const temp = getWeekEvent(edt, weekNumber);
      // setWeekEvent(temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEDT();
  }, []);

  useEffect(() => {
    setWeekEvent(getWeekEvent(edt, weekNumber));
  }, [weekNumber]);

  return (
    <>
      <Pagination
        loop
        color="secondary"
        total="52"
        initialPage={getCurrentWeekNumber()}
        onChange={(number: number) => setWeekNumber(number)}
      />
      <Timetable>
        <PlaceItemNoStyle gridColumn="1" gridRow="1"></PlaceItemNoStyle>

        {days.map((day, index) => (
          <PlaceItem gridColumn={index + 2} gridRow="1" key={index}>
            {day}
          </PlaceItem>
        ))}

        {hours.map((hour, index) => (
          <PlaceItemHours gridColumn="1" gridRow={index + 2} key={index}>
            <Hours>{hour}</Hours>
          </PlaceItemHours>
        ))}

        {weekEvent.map((day: any, index: number) => {
          return day.map((event: any) => {
            const { startCoord, endCoord } = getEventCoordinates(event);
            return (
              <PlaceItem
                gridColumn={index + 2}
                gridRow={`${startCoord} / ${endCoord}`}
                key={event.id}
              ></PlaceItem>
            );
          });
        })}

        {/* <PlaceItemNoStyle gridColumn="2" gridRow="2 / 7">
        <Card isPressable isHoverable variant="bordered" css={{ mw: '400px' }}>
          <Card.Body>
          <Text>A pressable card.</Text>
          </Card.Body>
        </Card>
      </PlaceItemNoStyle> */}
      </Timetable>
    </>
  );
}
