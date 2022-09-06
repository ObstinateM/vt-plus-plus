import styled from 'styled-components';

interface borderColor {
  type: string;
}

export const Timetable = styled.div<borderColor>`
  display: grid;
  height: 81vh;
  grid-template-columns: 30px repeat(6, 3fr);
  grid-template-rows: 50px repeat(50, minmax(5px, calc(80vh / 51)));
  grid-column-gap: 4px;
  border-top: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
  border-bottom: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
`;

interface PlaceItemProps {
  gridColumn: string | number;
  gridRow: string | number;
}

interface PlaceItemWithBorderProps {
  gridColumn: string | number;
  gridRow: string | number;
  type: string;
}

interface PlaceItemPropsColor {
  gridColumn: string | number;
  gridRow: string | number;
  bgColor: string;
  borderColor: string;
}

export const PlaceItem = styled.div<PlaceItemPropsColor>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  display: flex;
  background-color: ${props => props.bgColor};
  border: 1.5px solid ${props => props.borderColor};
  border-radius: 5px;
  text-overflow: ellipsis;
  justify-content: flex-end;
  flex-direction: column;
  padding: 5px;
`;

export const PlaceItemCenter = styled.div<PlaceItemProps>`
  box-sizing: border-box;
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
`;

export const PlaceItemHours = styled.div<PlaceItemWithBorderProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  display: flex;
  border-top: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
  justify-content: flex-end;
`;

export const PlaceItemNoStyle = styled.div<PlaceItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
`;

export const Hours = styled.div`
  margin-top: -13px;
  font-size: 9px;
`;

export const ClassNameDisplay = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  /* color: #000; */
`;

export const ClassHour = styled.p`
  font-size: 0.75rem;
  /* color: #000; */
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;
