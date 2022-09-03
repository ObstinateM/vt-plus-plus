import { useEffect, useState } from 'react';
import { getEDT, getWeekEvent } from '../utils/database';
import { Timetable, PlaceItem } from './Edt-part';

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
      <PlaceItem gridColumn="1" gridRow="1">
        Heure
      </PlaceItem>
      <PlaceItem gridColumn="2" gridRow="1">
        Lundi
      </PlaceItem>
      <PlaceItem gridColumn="3" gridRow="1">
        Mardi
      </PlaceItem>
      <PlaceItem gridColumn="4" gridRow="1">
        Mercredi
      </PlaceItem>
      <PlaceItem gridColumn="5" gridRow="1">
        Jeudi
      </PlaceItem>
      <PlaceItem gridColumn="6" gridRow="1">
        Vendredi
      </PlaceItem>
      <PlaceItem gridColumn="7" gridRow="1">
        Samedi
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="2">
        8h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="6">
        9h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="10">
        10h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="14">
        11h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="18">
        12h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="22">
        13h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="26">
        14h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="30">
        15h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="34">
        16h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="38">
        17h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="42">
        18h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="46">
        19h
      </PlaceItem>
      <PlaceItem gridColumn="1" gridRow="50">
        20h
      </PlaceItem>
    </Timetable>
  );
}
