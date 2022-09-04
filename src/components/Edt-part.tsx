import styled from 'styled-components';

export const Timetable = styled.div`
  display: grid;
  height: 80vh;
  grid-template-columns: 1fr repeat(6, 3fr);
  grid-template-rows: 30px repeat(50, calc(80vh / 51));
  grid-column-gap: 4px;
  background-color: #404040;
  border: 4px solid #404040;
`;

interface PlaceItemProps {
  gridColumn: string | number;
  gridRow: string | number;
}

export const PlaceItem = styled.div<PlaceItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  display: flex;
  background-color: #fff;
  text-overflow: ellipsis;
`;

export const PlaceItemHours = styled.div<PlaceItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  display: flex;
  border-top: 1px solid #fff;
  color: #fff;
  justify-content: flex-end;
`;

export const PlaceItemNoStyle = styled.div<PlaceItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
`;

export const Hours = styled.div`
  margin-top: -12px;
  font-size: 9px;
`;
